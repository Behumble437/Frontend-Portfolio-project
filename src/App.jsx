import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import References from "./pages/References";
import AdminProjects from "./pages/AdminProjects";
import AdminServices from "./pages/AdminServices";
import AdminUsers from "./pages/AdminUsers";
import AdminReferences from "./pages/AdminReferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/references" element={<References />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/references" element={<AdminReferences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;