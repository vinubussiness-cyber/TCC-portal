import { useState } from "react";
import axios from "axios";
import { FiBriefcase } from "react-icons/fi";
import { backend_url } from "../common";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backend_url}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("userId", res.data.user.id);

      alert(`Welcome ${res.data.user.name}!`);

      if (res.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        navigate("/employee/dashboard");;
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log("Backend Response:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("Server Connection Error");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <FiBriefcase />
          </div>
          <h2>Employee Portal</h2>
          <p className="login-subtitle">Sign in to your workspace</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-full" type="submit">
            Sign In
          </button>
        </form>

        <p className="login-footer">TheCadCompany Employee Management System</p>
      </div>
    </div>
  );
}

export default Login;
