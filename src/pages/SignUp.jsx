import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
      await API.post("/users/signup", formData);
      setMessage("Account created successfully. Please sign in.");

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <div className="section-label">Authentication</div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-desc">
            Register a new account to access protected portfolio management features.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <div className="auth-label">First name</div>
              <input
                className="auth-input"
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="auth-label">Last name</div>
              <input
                className="auth-input"
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-purple" type="submit">
              Create account
            </button>
          </form>

          {message && <p className="auth-message auth-success">{message}</p>}
          {error && <p className="auth-message auth-error">{error}</p>}

          <p className="auth-footer">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;