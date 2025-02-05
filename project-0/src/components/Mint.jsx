import React, { useState } from "react";
import Web3 from "web3";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Mint = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [openDialog, setOpenDialog] = useState(true); // Show dialog initially
  const [PAN, setPAN] = useState("");
  const [error, setError] = useState("");

  const factoryAddress = "0xc7c75463F234CBE795Ba521472C92C76fC334Bec"; // Replace with your contract address
  const factoryABI = [{"inputs":[{"internalType":"address","name":"_mda","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"deployFree","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"tokenType","type":"uint256"}],"name":"deployPaidBNB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"tokenType","type":"uint256"}],"name":"deployPaidMDA","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDeployPriceBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeployPriceMDA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokenDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateDeployPriceBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateDeployPriceMDA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"account","type":"address"}],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawTokenAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

  const handleVerify = (event) => {
    event.preventDefault();
    
    if (PAN.length === 10 && PAN[3].toUpperCase() === "C") {
      setIsVerified(true);
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
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  const handleMintToken = async (e) => {
    e.preventDefault();
    if (!web3 || !account) {
      alert("Please connect MetaMask first!");
      return;
    }

    const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
    
    try {
      const transaction = await factoryContract.methods.deployFree(tokenName, tokenSymbol, totalSupply).send({ from: account });
      setTransactionHash(transaction.transactionHash);
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
              <Button onClick={() => alert("Verification is required!")}>Cancel</Button>
              <Button type="submit">Verify</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show Page Only If Verified */}
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

                  <button className="mint-btn" type="submit">Create Token</button>
                </form>
              </div>

              {/* {transactionHash && <p>Transaction Hash: {transactionHash}</p>} */}
            </div>

          </section>
        </>
      )}
    </div>
  );
};

export default Mint;
