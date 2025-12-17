import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";


const networks = {
  ethereum: {
    id: "ethereum",
    name: "Ethereum Mainnet",
    chainId: "0x1",
    rpc: "https://mainnet.infura.io/v3/", // placeholder (MetaMask will handle default)
    explorerTx: "https://etherscan.io/tx/",
    envKey: "REACT_APP_FACTORY_ETHEREUM",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  sepolia: {
    id: "sepolia",
    name: "Sepolia Testnet",
    chainId: "0xaa36a7",
    rpc: "https://rpc.sepolia.org",
    explorerTx: "https://sepolia.etherscan.io/tx/",
    envKey: "REACT_APP_FACTORY_SEPOLIA",
    nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
  },
  polygon: {
    id: "polygon",
    name: "Polygon Mainnet",
    chainId: "0x89",
    rpc: "https://polygon-rpc.com",
    explorerTx: "https://polygonscan.com/tx/",
    envKey: "REACT_APP_FACTORY_POLYGON",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  },
  bsc: {
    id: "bsc",
    name: "BNB Smart Chain",
    chainId: "0x38",
    rpc: "https://bsc-dataseed.binance.org/",
    explorerTx: "https://bscscan.com/tx/",
    envKey: "REACT_APP_FACTORY_BSC",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  },
  avalanche: {
    id: "avalanche",
    name: "Avalanche C-Chain",
    chainId: "0xa86a",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorerTx: "https://snowtrace.io/tx/",
    envKey: "REACT_APP_FACTORY_AVALANCHE",
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  },
  fantom: {
    id: "fantom",
    name: "Fantom Opera",
    chainId: "0xfa",
    rpc: "https://rpc.ftm.tools/",
    explorerTx: "https://ftmscan.com/tx/",
    envKey: "REACT_APP_FACTORY_FANTOM",
    nativeCurrency: { name: "FTM", symbol: "FTM", decimals: 18 },
  },
  arbitrum: {
    id: "arbitrum",
    name: "Arbitrum One",
    chainId: "0xa4b1",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorerTx: "https://arbiscan.io/tx/",
    envKey: "REACT_APP_FACTORY_ARBITRUM",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  optimism: {
    id: "optimism",
    name: "Optimism",
    chainId: "0xa",
    rpc: "https://mainnet.optimism.io",
    explorerTx: "https://optimistic.etherscan.io/tx/",
    envKey: "REACT_APP_FACTORY_OPTIMISM",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
};

const Mint = () => {
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const [selectedNetwork, setSelectedNetwork] = useState("sepolia");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(true); // Show dialog initially
  const [openTxDialog, setOpenTxDialog] = useState(false);
  const [PAN, setPAN] = useState("");
  const [error, setError] = useState("");


// read ABI once (stringified ABI expected in env)
  let factoryABI = null;
  try {
    factoryABI = JSON.parse(process.env.REACT_APP_FACTORY_ABI || "null");
  } catch (err) {
    console.warn("Invalid or missing REACT_APP_FACTORY_ABI in .env");
  }

  // helper to get factory address for selected network from env
  const getFactoryAddressFor = (networkId) => {
    const net = networks[networkId];
    if (!net) return null;
    return process.env[net.envKey] || null;
  };

  // helper to switch MetaMask to chosen network (adds if missing)
  const switchToNetwork = async (networkId) => {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const net = networks[networkId];
    if (!net) throw new Error("Unknown network");

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
    } catch (switchError) {
      // 4902 = chain not added to MetaMask
      if (switchError && switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: net.chainId,
                chainName: net.name,
                rpcUrls: [net.rpc],
                nativeCurrency: net.nativeCurrency,
                blockExplorerUrls: [net.explorerTx.replace(/\/tx\/$/, "")],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network", addError);
          throw addError;
        }
      } else {
        console.error("Failed to switch network", switchError);
        throw switchError;
      }
    }
  };


  const handleVerify = (event) => {
    event.preventDefault();

    if (PAN.length === 10 && PAN[3].toUpperCase() === "C") {
      // setIsVerified(true);
      setOpenDialog(false);
    } else {
      setError("PAN number does not belong to a company or organization.");
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

      // switch to currently selected network after connecting
      try {
        await switchToNetwork(selectedNetwork);
      } catch (err) {
        // user may decline or add failure — still allow them to proceed, but warn on mint if wrong network
        console.warn("Network switch failed or canceled:", err);
      }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };
  const copyHash = () => {
    navigator.clipboard.writeText(transactionHash);
    alert("Transaction Hash Copied!");
  };
  const handleMintToken = async (e) => {
    e.preventDefault();
    if (!web3 || !account) {
      alert("Please connect MetaMask first!");
      return;
    }

    const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);

    try {
      setLoading(true);
      const transaction = await factoryContract.methods.deployFree(tokenName, tokenSymbol, totalSupply).send({ from: account });
      setTransactionHash(transaction.transactionHash);
      setLoading(false); 
      setOpenTxDialog(true);
    } catch (error) {
      console.error("Error deploying token:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mint-main">
      {/* Organization Verification Dialog */}
      <Dialog open={openDialog}>
        <DialogTitle>Organization Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your organization's PAN number for verification.</DialogContentText>
          <form onSubmit={handleVerify}>
            <TextField
              autoFocus
              required
              margin="dense"
              name="PAN"
              label="PAN Number"
              type="text"
              fullWidth
              variant="standard"
              value={PAN}
              onChange={(e) => setPAN(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <DialogActions>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit">Verify</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------ TRANSACTION HASH POPUP ------------------ */}
      <Dialog open={openTxDialog} onClose={() => setOpenTxDialog(false)}>
        <DialogTitle>Token Created Successfully!</DialogTitle>
        <DialogContent>
          <p><b>Transaction Hash:</b></p>
          <p style={{ fontSize: "14px", wordBreak: "break-all" }}>
            {transactionHash}
          </p>

          {/* 🔗 Etherscan button */}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={() =>
              window.open(
                `https://sepolia.etherscan.io/tx/${transactionHash}`,
                "_blank"
              )
            }
          >
            View on Etherscan
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={copyHash}>Copy</Button>
          <Button onClick={() => setOpenTxDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {(
        <>
          <div className="mint-hero">
            <button className="metamask" onClick={connectMetaMask}>
              {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect to MetaMask"}
            </button>
          </div>

          <section className="mint-area">
            <div className="form-box">
              <div className="form-value">
                <div className="mint-he">
                  <h2 className="mint-h2">Create a Token</h2>
                  <p className="mint-p">Please fill in the details below</p>
                </div>
                <form className="mint-form" onSubmit={handleMintToken}>

                  <div className="inputbox">
                    <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value)} required />
                    <label>Token Name</label>
                  </div>

                  <div className="inputbox">
                    <input type="text" value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} required />
                    <label>Token Symbol</label>
                  </div>

                  <div className="inputbox">
                    <input type="number" value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} min="1" max="1000" required />
                    <label>Total Supply</label>
                  </div>

                  <button className="mint-btn" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        &nbsp; Deploying...
                      </>
                    ) : (
                      "Create Token"
                    )}
                  </button>
                </form>

                {/* Full-screen loading animation while minting */}
                {loading && (
                  <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <CircularProgress />
                    <p>Deploying Token to Sepolia...</p>
                  </div>
                )}


              </div>
            </div>

          </section>
        </>
      )}
    </div>
  );
};

export default Mint;
