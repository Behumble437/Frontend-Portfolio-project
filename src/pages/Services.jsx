import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Services</h1>

        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          services.map((service) => (
            <div className="project" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
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

export default Services;