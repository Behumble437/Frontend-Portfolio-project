import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.brand}>Portfolio</span>
      </div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/about">About Me</Link>
        <Link style={styles.link} to="/projects">Projects</Link>
        <Link style={styles.link} to="/services">Services</Link>
        <Link style={styles.link} to="/contact">Contact</Link>
        <Link style={styles.link} to="/references">References</Link>

        {!isAuthenticated ? (
          <>
            <Link style={styles.link} to="/signup">Sign Up</Link>
            <Link style={styles.link} to="/signin">Sign In</Link>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <span style={styles.userText}>
              {user?.firstname ? `Hi, ${user.firstname}` : "Signed In"}
            </span>
            <button style={styles.button} onClick={logout}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 28px",
    background: "#1f2937",
    color: "#fff",
    flexWrap: "wrap",
    gap: "14px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
  },
  button: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  userText: {
    fontSize: "14px",
    color: "#d1d5db",
  },
};

export default Navbar;