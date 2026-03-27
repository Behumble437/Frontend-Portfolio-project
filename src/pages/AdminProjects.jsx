import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    completion: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      completion: "",
      description: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
      } else {
        await API.post("/projects", formData);
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      completion: project.completion || "",
      description: project.description || ""
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Manage Projects</h1>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="completion">Completion</label>
            <input
              type="text"
              id="completion"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
              placeholder="Example: Completed, In Progress"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn submit-btn">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn"
              onClick={resetForm}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>

        <hr />

        <h2>Project List</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div className="project" key={project.id}>
              <h3>{project.title}</h3>
              <p><strong>Completion:</strong> {project.completion}</p>
              <p>{project.description}</p>

              <button className="btn" onClick={() => handleEdit(project)}>
                Edit
              </button>

              <button
                className="btn"
                onClick={() => handleDelete(project.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
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

export default AdminProjects;