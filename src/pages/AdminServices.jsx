import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
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
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await API.put(`/services/${editingId}`, formData);
        setMessage("Service updated successfully.");
      } else {
        await API.post("/services", formData);
        setMessage("Service added successfully.");
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Failed to save service:", error);
      setMessage(error.response?.data?.message || "Failed to save service.");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || "",
    });
    setEditingId(service.id || service._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      setMessage("Service deleted successfully.");
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
      setMessage(error.response?.data?.message || "Failed to delete service.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>Manage Services</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Service Title"
            value={formData.title}
            onChange={handleChange}
            required
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
              {editingId ? "Update Service" : "Add Service"}
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

        <h2>Service List</h2>

        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          services.map((service) => (
            <div key={service.id || service._id} style={styles.card}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <button style={styles.smallBtn} onClick={() => handleEdit(service)}>
                Edit
              </button>
              <button
                style={{ ...styles.smallBtn, marginLeft: "10px", background: "#dc2626" }}
                onClick={() => handleDelete(service.id || service._id)}
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

export default AdminServices;