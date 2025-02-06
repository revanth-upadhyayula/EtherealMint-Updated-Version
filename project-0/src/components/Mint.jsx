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

  const factoryAddress = process.env.REACT_APP_FACTORY_ADDRESS;
  const factoryABI = JSON.parse(process.env.REACT_APP_FACTORY_ABI);


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
