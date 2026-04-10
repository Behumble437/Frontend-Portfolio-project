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
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <section className="feature-section">
        <div className="container">
          <div className="section-label">Portfolio</div>
          <h1 className="feature-heading">Projects</h1>
          <p className="feature-subtext">
            Projects added through the management dashboard will appear here.
          </p>

          {loading && <p className="feature-subtext">Loading projects...</p>}
          {error && <p className="auth-error">{error}</p>}

          {!loading && !error && projects.length === 0 && (
            <div className="card">
              <h3 className="card-title">No projects yet</h3>
              <p className="card-text">
                Projects will be displayed here after they are added in the dashboard.
              </p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="card-grid">
              {projects.map((project) => (
                <div key={project._id || project.id} className="card">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-text">
                    {project.description || "No description available."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;