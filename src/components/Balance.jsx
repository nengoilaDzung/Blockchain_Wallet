import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
const Balance = () => {
  // Setup
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
  );

  const fetchBalance = async () => {
    try {
      const balance = await web3.eth.getBalance(address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    } catch (error) {
      console.log("Error fetching balance: ", error);
    }
  };

  useEffect(() => {
    if (address !== "") {
      fetchBalance();
    }
  }, [address]);
  return (
    
    <div>
      <h1>Check Ethereum Balance</h1>
      <label>
        Enter an Ethereum address:
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>
      <br />
      {balance !== "" && <p>Balance: {balance} ETH</p>}
    </div>
  );
};

export default Balance;
