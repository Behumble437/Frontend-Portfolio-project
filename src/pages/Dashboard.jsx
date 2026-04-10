import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.firstname} {user?.lastname}</p>

        <div style={styles.grid}>
          <Link style={styles.card} to="/admin/projects">
            Manage Projects
          </Link>
          <Link style={styles.card} to="/admin/services">
            Manage Services
          </Link>
          <Link style={styles.card} to="/admin/users">
            Manage Users
          </Link>
          <Link style={styles.card} to="/admin/references">
            Manage References
          </Link>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    padding: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  card: {
    display: "block",
    padding: "24px",
    borderRadius: "12px",
    background: "#e5e7eb",
    textDecoration: "none",
    color: "#111827",
    fontWeight: "bold",
  },
};

export default Dashboard;