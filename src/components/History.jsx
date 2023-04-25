import React, { useEffect, useState } from "react";
import Web3 from "web3";
function History({ address }) {
  const [txList, setTxList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
  );
  useEffect(() => {
    async function fetchTxList() {
      const url = `http://api-sepolia.etherscan.io//api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=51KNI8CZZWE793788X3XSNKH7CXIIF3N9Q`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "1") {
        setTxList(data.result);
        console.log(txList);
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
      <h2>Transaction History for {address}</h2>
      <a
        href={`https://sepolia.etherscan.io/address/${address}`}
        target="_blank"
        rel="noreferrer"
        className="viewhistory"
      >
        View More
      </a>
      <ul className="transaction">
        <table className="transaction-table">
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
          {txList.slice(0, 9).map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
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
