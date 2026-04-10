import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand">
          Portfolio
        </Link>

        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
          <Link className="nav-link" to="/services">Services</Link>
          <Link className="nav-link" to="/references">References</Link>
          <Link className="nav-link" to="/contact">Contact</Link>

          {!isAuthenticated ? (
            <>
              <Link className="nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link" to="/signin">Sign In</Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <span className="nav-link">
                {user?.firstname ? `Hi, ${user.firstname}` : "Signed In"}
              </span>
              <button className="nav-button" onClick={logout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;