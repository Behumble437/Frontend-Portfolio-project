import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function References() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        setLoading(true);
        const res = await API.get("/references");
        setReferences(res.data.data || []);
      } catch (err) {
        setError("Failed to load references.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, []);

  return (
    <>
      <Navbar />

      <section className="feature-section">
        <div className="container">
          <div className="section-label">Professional</div>
          <h1 className="feature-heading">References</h1>
          <p className="feature-subtext">
            References added through the management dashboard will appear here.
          </p>

          {loading && <p className="feature-subtext">Loading references...</p>}
          {error && <p className="auth-error">{error}</p>}

          {!loading && !error && references.length === 0 && (
            <div className="card">
              <h3 className="card-title">No references yet</h3>
              <p className="card-text">
                References will be displayed here after they are added in the dashboard.
              </p>
            </div>
          )}

          {!loading && !error && references.length > 0 && (
            <div className="card-grid">
              {references.map((reference) => (
                <div key={reference._id || reference.id} className="card">
                  <h3 className="card-title">
                    {reference.firstname} {reference.lastname}
                  </h3>
                  <p className="card-text">{reference.email}</p>
                  <p className="card-text">{reference.position}</p>
                  <p className="card-text">{reference.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default References;