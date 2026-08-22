import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (

    <nav className="navbar">

      <NavLink to="/" className="logo">
        <span>ChromAware</span>
      </NavLink>


      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>


        <NavLink
          to="/learn"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Learn
        </NavLink>


        <NavLink
          to="/test"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Awareness Test
        </NavLink>


        <NavLink
          to="/ishihara"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Ishihara Test
        </NavLink>


        <NavLink
          to="/simulator"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Simulator
        </NavLink>


        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          About
        </NavLink>


        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Contact
        </NavLink>


      </div>


      <NavLink to="/ishihara" className="nav-btn">
        Start Screening
      </NavLink>


    </nav>

  );
}

export default Navbar;