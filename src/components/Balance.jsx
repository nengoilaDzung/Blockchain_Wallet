import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { WalletOutlined } from "@ant-design/icons";
import "../styles/balance.css";

const Balance = () => {
  // Setup
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
  );

  const userD = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function fetchBalance() {
      const balance = await web3.eth.getBalance(userD.publicKey);
      setBalance(balance);
      setIsLoading(false);
    }
    fetchBalance();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="balance">
      <WalletOutlined style={{ color: "white", fontSize: 20 }} />
      {isLoading ? (
        <h1>Loading balance...</h1>
      ) : (
        <h1>
          Balance: {parseFloat(web3.utils.fromWei(balance)).toFixed(3)} Eth
        </h1>
      )}
    </div>
  );
};

export default Balance;
