import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Welcome to My Portfolio</h1>

        <p>
          Hello! My name is <strong>Hanmu Xiong</strong>.
          I am a student developer in Centennial College.
        </p>

        <p>
          <strong>Goal:</strong>
          <br />
          My mission is to continuously improve my technical skills while building meaningful and efficient digital solutions.
        </p>

        <Link to="/about" className="btn">About Me</Link>
        <Link to="/projects" className="btn">View My Projects</Link>
      </div>

      <footer>
        @ 2026 Hanmu Xiong All rights reserved.
      </footer>
    </>
  );
}

export default Home;