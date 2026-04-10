import Navbar from "../components/Navbar";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="feature-section">
        <div className="container">
          <div className="section-label">Connect</div>
          <h1 className="feature-heading">Contact</h1>
          <p className="feature-subtext">
            Reach out for collaboration, opportunities, or general inquiries.
          </p>

          <div className="card" style={{ maxWidth: "600px" }}>
            <p className="card-text"><strong>Email:</strong> asd475885437@email.com</p>
            <p className="card-text"><strong>Phone:</strong> 123-456-7890</p>
            <p className="card-text"><strong>Location:</strong> Toronto, Canada</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;