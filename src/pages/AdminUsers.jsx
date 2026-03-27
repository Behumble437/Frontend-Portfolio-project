import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      password: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = editingId
      ? {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email
        }
      : formData;

    try {
      if (editingId) {
        await API.put(`/users/${editingId}`, payload);
      } else {
        await API.post("/users", payload);
      }

      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      password: ""
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Manage Users</h1>

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

          {!editingId && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn submit-btn">
            {editingId ? "Update User" : "Add User"}
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

        <h2>User List</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div className="project" key={user.id}>
              <h3>
                {user.firstname} {user.lastname}
              </h3>
              <p>{user.email}</p>

              <button className="btn" onClick={() => handleEdit(user)}>
                Edit
              </button>

              <button
                className="btn"
                onClick={() => handleDelete(user.id)}
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

export default AdminUsers;