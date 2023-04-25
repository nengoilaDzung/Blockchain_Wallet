import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/send.css";

const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/23WXDFCz8XmlDQpHHgMhs_d0N9zsXS7e"
);
const Send = () => {
  const navigate = useNavigate();
  const [senderAddress, setSenderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const userD = JSON.parse(localStorage.getItem("userData"));
  function nav() {
    window.location.href = "/user/login";
  }
  if (localStorage.getItem("auth-token") == null) {
    nav();
  }

  function openModal1() {
    setStatus1(true);
    setStatus2(false);
  }

  function closeModal1() {
    setStatus1(false);
    openModal2();
  }

  function cancel() {
    setStatus1(false);
    setStatus2(false);
  }

  function openModal2() {
    setStatus2(true);
  }

  function closeModal2() {
    setSenderAddress("");
    setRecipientAddress("");
    setAmount("");
    setPrivateKey("");
    setStatus2(false);
  }

  function closeModal3() {
    setStatus3(false);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    openModal1();
  }

  const handleSendEther = async (event) => {
    event.preventDefault();
    try {
      const balanceInWei = await web3.eth.getBalance(userD.publicKey);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

      if (Number(amount) > Number(balanceInEth)) {
        setErrorContent(
          `Insufficient funds. Account balance is ${balanceInEth} ETH.`
        );
        setStatus1(false);
        setStatus3(true);
      }
      web3.eth.accounts.wallet.add(privateKey);
      const result = await web3.eth.sendTransaction({
        from: userD.publicKey,
        to: recipientAddress,
        value: web3.utils.toWei(amount, "ether"),
        gas: 24000,
      });
      console.log(recipientAddress);
      console.log(result); //result contains all transaction's info, fetch this to create history
      closeModal1();
    } catch (error) {
      setStatus1(false);
      setStatus3(true);
      setErrorContent("Transaction failed!");
    }
  };

  return (
    <div className="send-page">
      <div className="send-form">
        <h1>Send Crypto</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <label>Sender Address:</label>
            <span>{userD.publicKey}</span>
            <br />
          </div>
          <div className="row">
            <label>Recipient Address:</label>
            <input
              type="text"
              required
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <br />
          </div>
          <div className="row">
            <label>Amount:</label>
            <input
              type="text"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
          </div>
          <div className="row">
            <label>Private key:</label>
            <input
              type="password"
              required
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <br />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>

      {status1 ? (
        <div className="modal-container">
          <div className="modal">
            <h2>Confirm transaction</h2>
            <p>
              Are you sure you want to send <b>{amount}</b> ETH?
            </p>
            <button className="green-btn" onClick={handleSendEther}>
              Confirm
            </button>
            <button className="red-btn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {status2 ? (
        <div className="modal-container">
          <div className="modal">
            <h2>Crypto sent successfully!</h2>
            <button className="green-btn" onClick={closeModal2}>
              OK
            </button>
          </div>
        </div>
      ) : null}
      {status3 ? (
        <div className="modal-container">
          <div className="modal">
            <h2 style={{ color: "red" }}>Error!</h2>
            <p>{errorContent}</p>
            <button className="green-btn" onClick={closeModal3}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Send;
