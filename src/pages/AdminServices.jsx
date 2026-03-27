import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data.data);
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
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/services/${editingId}`, formData);
      } else {
        await API.post("/services", formData);
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Failed to save service:", error);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || ""
    });
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Manage Services</h1>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="title">Service Title</label>
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
            {editingId ? "Update Service" : "Add Service"}
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

        <h2>Service List</h2>

        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          services.map((service) => (
            <div className="project" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <button className="btn" onClick={() => handleEdit(service)}>
                Edit
              </button>

              <button
                className="btn"
                onClick={() => handleDelete(service.id)}
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

export default AdminServices;