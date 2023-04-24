import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
);

const Send = () => {
  const navigate = useNavigate();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState(false);
  const userD = JSON.parse(localStorage.getItem("userData"));
  function nav() {
    window.location.href = "/user/login";
  }
  if (localStorage.getItem("auth-token") == null) {
    nav();
  }
  const handleSendEther = async (event) => {
    event.preventDefault();
    try {
      const balanceInWei = await web3.eth.getBalance(userD.publicKey);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

      if (Number(amount) > Number(balanceInEth)) {
        alert(`Insufficient funds. Account balance is ${balanceInEth} ETH.`);
        throw new Error(
          `Insufficient funds. Account balance is ${balanceInEth} ETH.`
        );
      }
      web3.eth.accounts.wallet.add(privateKey);
      const result = await web3.eth.sendTransaction({
        from: userD.publicKey,
        to: recipientAddress,
        value: web3.utils.toWei(amount, "ether"),
        gas: 24000,
      });
      console.log(result); //result contains all transaction's info, fetch this to create history
      setStatus(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSendEther}>
        <label>
          Sender ID:{" "}
          <span style={{ fontWeight: "bold" }}>{userD.publicKey}</span>
        </label>
        <br />
        <label>
          Recipient Address:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Private key/Password:
          <input
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send Ether</button>
      </form>
      {status ? <div>Success</div> : ""}
    </>
  );
};

export default Send;
