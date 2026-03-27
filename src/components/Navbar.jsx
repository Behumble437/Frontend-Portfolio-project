import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="My Logo" />
        </div>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/references">References</Link></li>
            <li><Link to="/admin/projects">Manage Projects</Link></li>
            <li><Link to="/admin/services">Manage Services</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/references">Manage References</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;