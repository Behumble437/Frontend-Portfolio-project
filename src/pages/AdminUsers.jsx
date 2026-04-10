import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.data || []);
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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await API.put(`/users/${editingId}`, {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
        });
        setMessage("User updated successfully.");
      } else {
        await API.post("/users/signup", formData);
        setMessage("User added successfully.");
      }

      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
      setMessage(error.response?.data?.message || "Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      password: "",
    });
    setEditingId(user.id || user._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setMessage(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h1>Manage Users</h1>

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

          {!editingId && (
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}

          <div style={styles.row}>
            <button style={styles.button} type="submit">
              {editingId ? "Update User" : "Add User"}
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

        <h2>User List</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id || user._id} style={styles.card}>
              <h3>
                {user.firstname} {user.lastname}
              </h3>
              <p>{user.email}</p>

              <button style={styles.smallBtn} onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                style={{ ...styles.smallBtn, marginLeft: "10px", background: "#dc2626" }}
                onClick={() => handleDelete(user.id || user._id)}
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

export default AdminUsers;