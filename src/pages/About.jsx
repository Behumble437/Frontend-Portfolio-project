import Navbar from "../components/Navbar";
import profile from "../assets/images/profile.jpg";

function About() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>About Me</h1>

        <img src={profile} alt="Profile Photo" className="profile-img" />

        <p><strong>Full name:</strong> Hanmu Xiong</p>

        <p>
          I am a student currently studying software engineering.
          I enjoy learning new technologies and applying them to real-world projects.
        </p>

        <a
          href="/Hanmu_Xiong_Resume.pdf"
          className="btn"
          target="_blank"
          rel="noreferrer"
        >
          Download My Resume (PDF)
        </a>
      </div>

      <footer>
        @ 2026 Hanmu Xiong. All rights reserved.
      </footer>
    </>
  );
}

export default About;