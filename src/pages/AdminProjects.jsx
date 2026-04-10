import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    completion: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.data || []);
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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      completion: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
        setMessage("Project updated successfully.");
      } else {
        await API.post("/projects", formData);
        setMessage("Project added successfully.");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
      setMessage(error.response?.data?.message || "Failed to save project.");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      completion: project.completion
        ? new Date(project.completion).toISOString().split("T")[0]
        : "",
      description: project.description || "",
    });
    setEditingId(project.id || project._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setMessage("Project deleted successfully.");
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      setMessage(error.response?.data?.message || "Failed to delete project.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>Manage Projects</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="date"
            name="completion"
            value={formData.completion}
            onChange={handleChange}
          />

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div style={styles.row}>
            <button style={styles.button} type="submit">
              {editingId ? "Update Project" : "Add Project"}
            </button>

            {editingId && (
              <button style={styles.cancel} type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p>{message}</p>}

        <hr />

        <h2>Project List</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id || project._id} style={styles.card}>
              <h3>{project.title}</h3>
              <p>
                Completion Date:{" "}
                {project.completion
                  ? new Date(project.completion).toLocaleDateString("en-CA")
                  : "N/A"}
              </p>
              <p>{project.description}</p>

              <button style={styles.smallBtn} onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button
                style={{ ...styles.smallBtn, marginLeft: "10px", background: "#dc2626" }}
                onClick={() => handleDelete(project.id || project._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}

        <p style={styles.footer}>@ 2026 Hanmu Xiong. All rights reserved.</p>
      </div>
    </>
  );
}

const styles = {
  page: { padding: "40px" },
  form: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" },
  input: { padding: "12px", border: "1px solid #ccc", borderRadius: "8px" },
  textarea: { padding: "12px", border: "1px solid #ccc", borderRadius: "8px", minHeight: "120px" },
  row: { display: "flex", gap: "10px" },
  button: { padding: "10px 14px", border: "none", borderRadius: "8px", background: "#2563eb", color: "#fff", cursor: "pointer" },
  cancel: { padding: "10px 14px", border: "none", borderRadius: "8px", background: "#6b7280", color: "#fff", cursor: "pointer" },
  card: { marginTop: "16px", padding: "18px", borderRadius: "10px", background: "#f9fafb" },
  smallBtn: { padding: "8px 12px", border: "none", borderRadius: "6px", background: "#2563eb", color: "#fff", cursor: "pointer" },
  footer: { marginTop: "30px" },
};

export default AdminProjects;