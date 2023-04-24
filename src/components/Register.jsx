import axios from "axios";
import { useState } from "react";
import Web3 from "web3";
const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/kscoUoRZN5FhliMzeir3e6gz7NdA3JgF"
);
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
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
  }

  return (
    <div>
      <div class="container mt-4">
        <div class="card">
          <h1>Account Registation</h1>

          <form>
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setStatus(true);
                setPassword(web3.eth.accounts.create().privateKey);
                setEmail(web3.eth.accounts.create().address);
              }}
            >
              Generate
              
              
            </button>
            <div>
                {status ? (
                <div>
                  <div>{email}</div> <div>{password}</div>
                </div>
              ) : (
                ""
              )}
              </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="submit" class="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
