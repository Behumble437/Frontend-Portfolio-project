import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await API.get("/services");
        setServices(res.data.data || []);
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Navbar />

      <section className="feature-section">
        <div className="container">
          <div className="section-label">Offerings</div>
          <h1 className="feature-heading">Services</h1>
          <p className="feature-subtext">
            Services added through the management dashboard will appear here.
          </p>

          {loading && <p className="feature-subtext">Loading services...</p>}
          {error && <p className="auth-error">{error}</p>}

          {!loading && !error && services.length === 0 && (
            <div className="card">
              <h3 className="card-title">No services yet</h3>
              <p className="card-text">
                Services will be displayed here after they are added in the dashboard.
              </p>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="card-grid">
              {services.map((service) => (
                <div key={service._id || service.id} className="card">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-text">
                    {service.description || "No description available."}
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

export default Services;