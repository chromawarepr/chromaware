import { Link } from "react-router-dom";
import "./Home.css";

import heroImage from "../assets/hero.png";
import { startAwarenessTest } from "../utils/flowControl";

function Home() {

  const handleStartAwarenessTest = () => {
    startAwarenessTest();
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            COLOR VISION AWARENESS PLATFORM
          </p>

          <h1>
            Understanding Color Vision
            <br />
            <span>Through Awareness</span>
          </h1>

          <p className="hero-description">
            ChromAware is an interactive educational website
            designed to help students understand Color Vision
            Deficiency through learning modules, simulations,
            and screening activities.
          </p>

          <div className="hero-buttons">

            <Link
              to="/test"
              className="primary-btn"
              onClick={handleStartAwarenessTest}
            >
              Start Awareness Test
            </Link>

          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroImage}
            alt="Color vision awareness"
          />
        </div>

      </section>


      {/* FEATURES */}
      <section className="features">

        <div className="section-header">

          <h2>
            Why ChromAware?
          </h2>

          <p>
            Promoting awareness and accessibility
            through interactive educational tools.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <h3>
              Learn
            </h3>

            <p>
              Understand Color Vision Deficiency,
              its types, causes, and effects on
              daily activities.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Simulator
            </h3>

            <p>
              Experience different color vision
              conditions through interactive
              visual simulations.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Screening
            </h3>

            <p>
              Take educational screening activities
              using Ishihara color plates.
            </p>

          </div>

        </div>

      </section>


      {/* CALL TO ACTION */}
      <section className="cta">

        <h2>
          Ready to explore color awareness?
        </h2>

    

        <Link
          to="/test"
          className="primary-btn"
          onClick={handleStartAwarenessTest}
        >
          Start Awareness Test
        </Link>

      </section>

    </div>
  );
}

export default Home;