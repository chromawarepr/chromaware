import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>ChromAware</h2>

          <p>
            ChromAware is an interactive educational website developed
            to promote awareness of Color Vision Deficiency (CVD) through
            accessible learning materials, simulations, and assessments.
          </p>
        </div>

        

        <div className="footer-links">
          <h3>Information</h3>

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ChromAware • STEM Research Project • All Rights Reserved
        </p>
      </div>

    </footer>
  );
}

export default Footer;