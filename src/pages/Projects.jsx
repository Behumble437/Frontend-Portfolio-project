import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>My Projects</h1>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div className="project" key={project.id}>
              <h3>{project.title}</h3>
              <p><strong>Completion:</strong> {project.completion}</p>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>

      <footer>
        @ 2026 Hanmu Xiong. All rights reserved.
      </footer>
    </>
  );
}

export default Projects;