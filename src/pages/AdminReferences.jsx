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
    company: ""
  });
  const [editingId, setEditingId] = useState(null);

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
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      position: "",
      company: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/references/${editingId}`, formData);
      } else {
        await API.post("/references", formData);
      }

      resetForm();
      fetchReferences();
    } catch (error) {
      console.error("Failed to save reference:", error);
      alert(error.response?.data?.message || "Failed to save reference");
    }
  };

  const handleEdit = (reference) => {
    setFormData({
      firstname: reference.firstname || "",
      lastname: reference.lastname || "",
      email: reference.email || "",
      position: reference.position || "",
      company: reference.company || ""
    });
    setEditingId(reference.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/references/${id}`);
      fetchReferences();
    } catch (error) {
      console.error("Failed to delete reference:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Manage References</h1>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn submit-btn">
            {editingId ? "Update Reference" : "Add Reference"}
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

        <h2>Reference List</h2>

        {references.length === 0 ? (
          <p>No references found.</p>
        ) : (
          references.map((reference) => (
            <div className="project" key={reference.id}>
              <h3>
                {reference.firstname} {reference.lastname}
              </h3>
              <p><strong>Email:</strong> {reference.email}</p>
              <p><strong>Position:</strong> {reference.position}</p>
              <p><strong>Company:</strong> {reference.company}</p>

              <button className="btn" onClick={() => handleEdit(reference)}>
                Edit
              </button>

              <button
                className="btn"
                onClick={() => handleDelete(reference.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <footer>@ 2026 Hanmu Xiong. All rights reserved.</footer>
    </>
  );
}

export default AdminReferences;