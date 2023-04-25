import axios from "axios";
import { useState } from "react";
import Web3 from "web3";
import '../styles/register.css'

const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
);
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  function nav() {
    window.location.href = "/user/login";
  }
  async function save(event) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8080/register", {
        name: name,
        publicKey: email,
        password: password,
      });
      alert("Registation Successfully");
    } catch (err) {
      alert(err);
    }
    setEmail("");
    setPassword("");
    setName("");
    nav();
  }

  return (
    <div className="register-page">
      <div className="register-form">
        <h1>Account Registation</h1>
        <form>
          <div className="row">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <button
            style={{padding: 5, fontSize: 16}}
            type="button"
            onClick={() => {
              setStatus(true);
              setPassword(web3.eth.accounts.create().privateKey);
              setEmail(web3.eth.accounts.create().address);
            }}
          >
            Generate
          </button>
          {status ? (
            <div className="suggestion">
              <h3>Suggestion:</h3>
              <span>Public Key: {email}</span>
              <span>Private Key: {password}</span>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <label>Public Key:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="row">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button type="submit" onClick={save}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
