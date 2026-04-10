import Navbar from "../components/Navbar";
import profile from "../assets/profile.jpg";

function About() {
  return (
    <>
      <Navbar />

      <section className="feature-section">
        <div className="container">
          <div className="section-label">About</div>

          <h1 className="feature-heading">About Me</h1>

          <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
            
            <img
              src={profile}
              alt="Profile"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow:
                  "rgba(97,104,117,0.05) 0px 1px 1px, rgba(97,104,117,0.05) 0px 2px 2px",
              }}
            />

            <div style={{ maxWidth: "600px" }}>
              <p className="feature-subtext">
                <strong>Full name:</strong> Hanmu Xiong
              </p>

              <p className="feature-subtext">
                I am a student currently studying software engineering. I enjoy learning new technologies and applying them to real-world projects.
              </p>

              <a
                href="/Hanmu_Xiong_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ display: "inline-block", marginTop: "20px" }}
              >
                Download My Resume
              </a>
            </div>

          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "40px", color: "#656a76" }}>
        © 2026 Hanmu Xiong. All rights reserved.
      </footer>
    </>
  );
}

export default About;