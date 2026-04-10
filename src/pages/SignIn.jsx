import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await API.post("/users/signin", formData);
      login(res.data.data, res.data.token);
      setMessage("Sign in successful.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <div className="section-label">Authentication</div>
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-desc">
            Access your dashboard and manage protected portfolio content.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <div className="auth-label">Email</div>
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="auth-label">Password</div>
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-purple" type="submit">
              Sign in
            </button>
          </form>

          {message && <p className="auth-message auth-success">{message}</p>}
          {error && <p className="auth-message auth-error">{error}</p>}

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;