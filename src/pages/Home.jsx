import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero-dark">
        <div className="container hero-grid">
          <div>
            <div className="section-label">Portfolio Platform</div>
            <h1 className="hero-title">
              Build and manage your portfolio with a clean, professional workflow.
            </h1>
            <p className="hero-text">
              Showcase projects, services, and references in one full-stack web
              application. Sign in to manage your content, or explore the public
              pages as a visitor.
            </p>

            <div className="hero-actions">
              <Link to="/signin">
                <button className="btn btn-light">Get started</button>
              </Link>

              <Link to="/projects">
                <button className="btn btn-dark">View projects</button>
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <h3 className="hero-panel-title">Infrastructure for your personal brand</h3>
            <p className="hero-panel-text">
              This portfolio app lets you manage your public content with a secure
              backend, authenticated dashboard, and cloud deployment workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="container">
          <div className="section-label">Core Features</div>
          <h2 className="feature-heading">A portfolio system built like a real product.</h2>
          <p className="feature-subtext">
            The application combines frontend presentation, backend APIs, user
            authentication, and protected management pages in one deployed project.
          </p>

          <div className="card-grid">
            <div className="card">
              <h3 className="card-title">Projects</h3>
              <p className="card-text">
                Present completed work with structured descriptions and timelines.
              </p>
            </div>

            <div className="card">
              <h3 className="card-title">Services</h3>
              <p className="card-text">
                Show what you can offer in a clean, professional format.
              </p>
            </div>

            <div className="card">
              <h3 className="card-title">References</h3>
              <p className="card-text">
                Organize reference information in a way that supports credibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;