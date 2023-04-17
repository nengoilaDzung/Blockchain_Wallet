import React, { useState } from "react";
import Web3 from "web3";

const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
);
const Send = () => {
  const [senderAddress, setSenderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState(false);
  const handleSendEther = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    web3.eth.accounts.wallet.add(
      "e3cda27e33de922cb2f2675b37587130876b8146ac36e815a201146a22df8e8f"
    );
    try {
      const sender = "0x4B1a3E22C7a5267A56a5912844A42f3dacECB2D4";

      const balanceInWei = await web3.eth.getBalance(senderAddress);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

      if (Number(amount) > Number(balanceInEth)) {
        throw new Error(
          `Insufficient funds. Account balance is ${balanceInEth} ETH.`
        );
      }
      web3.eth.accounts.wallet.add(privateKey);
      const result = await web3.eth.sendTransaction({
        from: senderAddress,
        to: recipientAddress,
        value: web3.utils.toWei(amount, "ether"),
        gas: 24000,
      });
      console.log(result);
      setStatus(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSendEther}>
        <label>
          Sender Address:
          <input
            type="text"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
          />
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
          Private key:
          <input
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send Ether</button>
      </form>
      {status ? (<div>Success</div>) : ('')}
    </>
  );
};

export default Send;
