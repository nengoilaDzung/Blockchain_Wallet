import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
    <div>
      <div class="container">
        <div class="row">
          <h2>Login</h2>
          <hr />
        </div>

        <div class="row">
          <div class="col-sm-6">
            <form>
              <div class="form-group">
                <label>Public Key</label>
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

              <div class="form-group">
                <label>password</label>
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
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
