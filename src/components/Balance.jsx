import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Balance = () => {
  // Setup
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
  );
  const userD = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    async function fetchBalance() {
      setIsLoading(true);
      const balance = await web3.eth.getBalance(userD.publicKey);
      setBalance(balance);
      setIsLoading(false);
    }

    fetchBalance();
  }, []);

  return (
    <div>
      <h1>Check Ethereum Balance</h1>
      <br />
      {isLoading ? (
        <p>Loading balance...</p>
      ) : (
        <p>Balance: {web3.utils.fromWei(balance)} ETH</p>
      )}
    </div>
  );
};

export default Balance;
