import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminReferences() {
  const [references, setReferences] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    company: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchReferences = async () => {
    try {
      const res = await API.get("/references");
      setReferences(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch references:", error);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      position: "",
      company: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await API.put(`/references/${editingId}`, formData);
        setMessage("Reference updated successfully.");
      } else {
        await API.post("/references", formData);
        setMessage("Reference added successfully.");
      }

      resetForm();
      fetchReferences();
    } catch (error) {
      console.error("Failed to save reference:", error);
      setMessage(error.response?.data?.message || "Failed to save reference.");
    }
  };

  const handleEdit = (reference) => {
    setFormData({
      firstname: reference.firstname || "",
      lastname: reference.lastname || "",
      email: reference.email || "",
      position: reference.position || "",
      company: reference.company || "",
    });
    setEditingId(reference.id || reference._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/references/${id}`);
      setMessage("Reference deleted successfully.");
      fetchReferences();
    } catch (error) {
      console.error("Failed to delete reference:", error);
      setMessage(error.response?.data?.message || "Failed to delete reference.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>Manage References</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <div style={styles.row}>
            <button style={styles.button} type="submit">
              {editingId ? "Update Reference" : "Add Reference"}
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

        <h2>Reference List</h2>

        {references.length === 0 ? (
          <p>No references found.</p>
        ) : (
          references.map((reference) => (
            <div key={reference.id || reference._id} style={styles.card}>
              <h3>
                {reference.firstname} {reference.lastname}
              </h3>
              <p>Email: {reference.email}</p>
              <p>Position: {reference.position}</p>
              <p>Company: {reference.company}</p>

              <button style={styles.smallBtn} onClick={() => handleEdit(reference)}>
                Edit
              </button>
              <button
                style={{ ...styles.smallBtn, marginLeft: "10px", background: "#dc2626" }}
                onClick={() => handleDelete(reference.id || reference._id)}
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
  row: { display: "flex", gap: "10px" },
  button: { padding: "10px 14px", border: "none", borderRadius: "8px", background: "#2563eb", color: "#fff", cursor: "pointer" },
  cancel: { padding: "10px 14px", border: "none", borderRadius: "8px", background: "#6b7280", color: "#fff", cursor: "pointer" },
  card: { marginTop: "16px", padding: "18px", borderRadius: "10px", background: "#f9fafb" },
  smallBtn: { padding: "8px 12px", border: "none", borderRadius: "6px", background: "#2563eb", color: "#fff", cursor: "pointer" },
  footer: { marginTop: "30px" },
};

export default AdminReferences;