import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import '../styles/login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        publicKey: email,
        password: password,
      });
      localStorage.setItem("auth-token", response.data.token);
    } catch (err) {
      console.log(err);
    }

    navigate("/user");
    window.location.reload();
  };

  return (
    <div className="login-page">
      <div class="login-form">
        <h1>Login</h1>

        <form>
          <div class="row">
            <label>Public Key:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter Public Key"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div class="row">
            <label>Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter Password/Private Key"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="register">
            <h3>Haven't registered yet?</h3>
            <a href="http://localhost:3000/user/register">Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
