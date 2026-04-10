import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await API.get("/projects");
        setProjects(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>My Projects</h1>

        {loading && <p>Loading projects...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && !error && projects.length === 0 && <p>No projects found.</p>}

        <div style={styles.grid}>
          {!loading &&
            !error &&
            projects.map((project) => (
              <div key={project.id || project._id} style={styles.card}>
                <h3>{project.title}</h3>
                <p>
                  <strong>Completion Date:</strong>{" "}
                  {project.completion
                    ? new Date(project.completion).toLocaleDateString("en-CA")
                    : "N/A"}
                </p>
                <p>{project.description}</p>
              </div>
            ))}
        </div>

        <p style={styles.footer}>@ 2026 Hanmu Xiong. All rights reserved.</p>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  error: {
    color: "red",
  },
  footer: {
    marginTop: "30px",
  },
};

export default Projects;