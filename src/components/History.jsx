import React, { useEffect, useState } from "react";
import Web3 from "web3";
function History({ address }) {
  const [txList, setTxList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
  );
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  useEffect(() => {
    async function fetchTxList() {
      const url = `http://api-sepolia.etherscan.io//api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=51KNI8CZZWE793788X3XSNKH7CXIIF3N9Q`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "1") {
        setTxList(data.result);
      } else {
        console.error("Error fetching transaction history");
      }
    }
    fetchTxList();
  }, [address]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Transaction History</h1>
      <a
        href={`https://sepolia.etherscan.io/address/${address}`}
        target="_blank"
        rel="noreferrer"
        className="viewhistory"
        style={{fontSize:15}}
      >
        View More
      </a>
      <ul className="transaction">
        <table className="transaction-table">
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
          {txList.slice(0, 9).map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{formatDate(tx.timeStamp)}</td>
              <td>
                {tx.from != address.toLowerCase() ? (
                  <span style={{ color: "green" }}>IN</span>
                ) : (
                  <span style={{ color: "red" }}>OUT</span>
                )}
              </td>
              <td>
                {parseFloat(web3.utils.fromWei(tx.value, "ether")).toFixed(4)}{" "}
                ETH
              </td>
            </tr>
          ))}
        </table>
      </ul>
    </div>
  );
}

export default History;
