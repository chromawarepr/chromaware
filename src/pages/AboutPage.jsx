import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import quishaPhoto from "../assets/researchers/quisha.jpg";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-content">

          <span className="about-tag">
            ABOUT CHROMAWARE
          </span>

          <h1>
            Empowering Awareness of
            <span> Color Vision Deficiency</span>
          </h1>

          <p>
            ChromAware is an interactive educational website
            developed to improve awareness of Color Vision
            Deficiency through engaging learning materials,
            simulation, educational screening, and awareness
            assessment.
          </p>

        

        </div>

        <div className="about-image">

          <img
            src={logo}
            alt="ChromAware Logo"
          />

        </div>

      </section>

      {/* MISSION & VISION */}

      <section className="mission-section">

        <div className="mission-card">

          <h2>Our Mission</h2>

          <p>
            To promote awareness of Color Vision Deficiency by
            providing interactive educational resources that
            encourage accessible learning and inclusive
            educational practices.
          </p>

        </div>

        <div className="mission-card">

          <h2>Our Vision</h2>

          <p>
            To become a trusted educational platform that helps
            students, educators, and communities understand
            Color Vision Deficiency through technology and
            interactive learning.
          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <h2>What ChromAware Offers</h2>

        <div className="features-grid">

          <div className="feature-card">

            <h3>Interactive Learning</h3>

            <p>
              Learn the fundamentals of Color Vision
              Deficiency through engaging educational
              content.
            </p>

          </div>

          <div className="feature-card">

            <h3>Color Vision Simulator</h3>

            <p>
              Experience how different types of
              Color Vision Deficiency affect visual
              perception.
            </p>

          </div>

          <div className="feature-card">

            <h3>Awareness Assessment</h3>

            <p>
              Test your understanding through an
              interactive awareness assessment.
            </p>

          </div>

          <div className="feature-card">

            <h3>Ishihara Screening</h3>

            <p>
              Perform an educational Ishihara-based
              screening experience.
            </p>

          </div>

        </div>

      </section>

                   {/* FAQ */}

<section className="faq-section">

  <h2>Frequently Asked Questions</h2>

  <div className="faq-grid">

    <div className="faq-card">
      <h3>Is ChromAware a medical diagnostic tool?</h3>
      <p>
        No. ChromAware is designed for educational and awareness purposes
        only and should not replace a professional eye examination.
      </p>
    </div>

    <div className="faq-card">
      <h3>Who developed ChromAware?</h3>
      <p>
        ChromAware was developed as a STEM research project to promote
        awareness of Color Vision Deficiency and accessible learning.
      </p>
    </div>

    <div className="faq-card">
      <h3>How can I contact the researchers?</h3>
      <p>
        You may send your questions or suggestions through the feedback
        form below or contact us via email.
      </p>
    </div>

  </div>

</section>

      {/* RESEARCH */}

      <section className="research-section">

        <h2>Research Information</h2>

        <div className="research-card">

          <h3>Research Title</h3>

          <p>
            ChromAware: An Interactive Educational Website
            for Color Blindness Awareness
          </p>

          <hr />

          <h3>Institution</h3>

          <p>
            Tanauan City Integrated High School
          </p>

          <hr />

          <h3>Academic Strand</h3>

          <p>
            Science, Technology, Engineering and Mathematics (STEM)
          </p>

          <hr />

          <h3>Academic Year</h3>

          <p>
            2025 – 2026
          </p>

        </div>

      </section>


      {/* RESEARCH TEAM */}

      <section className="research-team-section">

        <div className="section-header">

          <span className="section-tag">
            RESEARCH TEAM
          </span>

          <h2>
            Meet the Research Team
          </h2>

          <p>
            ChromAware was developed by Grade 12 STEM
            students from Tanauan City Integrated High School.
          </p>

        </div>

        <div className="research-team-grid">

          <div className="research-member">

            <img
              src={quishaPhoto}
              alt="Quisha Fae A. Cortez"
            />

            <h3>
              Cortez, Quisha Fae A.
            </h3>

            <h4>
              Lead Developer • Researcher
            </h4>

            <p>
              PINAKAMASIKIP
            PINAKAMASARAP 
            PINAKACUTE
            </p>

          </div>

          <div className="research-member">

            <div className="coming-soon-photo">
              Photo Coming Soon
            </div>

            <h3>
              Group Member
            </h3>

            <h4>
              Researcher
            </h4>

            <p>
              Contributed to research documentation,
              methodology, testing, and data gathering.
            </p>

          </div>

          <div className="research-member">

            <div className="coming-soon-photo">
              Photo Coming Soon
            </div>

            <h3>
              Group Member
            </h3>

            <h4>
              Researcher
            </h4>

            <p>
              Assisted in content development,
              evaluation, validation, and preparation
              of research documents.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AboutPage;