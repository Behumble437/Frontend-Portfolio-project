import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function References() {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res = await API.get("/references");
        setReferences(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch references:", error);
      }
    };

    fetchReferences();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>References</h1>

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
            </div>
          ))
        )}
      </div>

      <footer>@ 2026 Hanmu Xiong. All rights reserved.</footer>
    </>
  );
}

export default References;