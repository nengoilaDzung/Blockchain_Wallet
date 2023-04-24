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
    <div>
      <div class="container mt-4">
        <div class="card">
          <h1>Account Registation</h1>
          <span>Remember to save your address and private key!</span>
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

            <button type="submit" class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
