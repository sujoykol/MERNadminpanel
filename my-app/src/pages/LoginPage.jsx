// src/pages/LoginPage.jsx
import { useState } from "react";
import { login } from "../services/authService";
import { setAccessToken } from "../utils/tokenHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login(email, password);
      setAccessToken(accessToken);
      localStorage.setItem('token', accessToken);
      toast.success("Login successful");
      navigate("/dashboard"); // Change route if needed
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
