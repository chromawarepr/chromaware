import { useState, useEffect } from "react";
import "./UserGuide.css";

function UserGuide() {
  const [isOpen, setIsOpen] = useState(false);

  /* =========================================
     SHOW GUIDE ONLY ONCE PER BROWSER SESSION
  ========================================= */
  useEffect(() => {
    const guideAlreadyShown = sessionStorage.getItem(
      "chromaware_user_guide_shown"
    );

    // Kapag nakita na ang guide sa current session,
    // huwag na itong automatic na ipakita.
    if (guideAlreadyShown === "true") {
      return;
    }

    // Small delay para mauna muna ang intro.
    const timer = setTimeout(() => {
      setIsOpen(true);

      sessionStorage.setItem(
        "chromaware_user_guide_shown",
        "true"
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================
     PREVENT SCROLLING WHILE GUIDE IS OPEN
  ========================================= */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("user-guide-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("user-guide-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("user-guide-open");
    };
  }, [isOpen]);

  const closeGuide = () => {
    setIsOpen(false);
  };

  const openGuide = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* USER GUIDE POPUP */}
      {isOpen && (
        <div className="guide-overlay">
          <div
            className="guide-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
          >

            {/* HEADER */}
            <div className="guide-header">
              <div className="guide-icon">?</div>

              <div className="guide-title-area">
                <p className="guide-small-title">
                  WELCOME TO
                </p>

                <h1 id="guide-title">
                  ChromAware
                </h1>

                <p className="guide-subtitle">
                  Website User Guide
                </p>
              </div>
            </div>

            {/* INTRO */}
            <div className="guide-intro">
              <p>
                Follow these steps to explore the ChromAware
                website and complete all of its features in the
                proper order.
              </p>
            </div>

            {/* GUIDE CONTENT */}
            <div className="guide-content">

              {/* STEP 1 */}
              <div className="guide-step">
                <div className="step-number">1</div>

                <div className="step-text">
                  <h3>Start the Awareness Test</h3>

                  <ul>
                    <li>
                      Open the ChromAware website. You will be
                      directed to the <strong>Home Page</strong>.
                    </li>

                    <li>
                      Click <strong>“Start Awareness Test.”</strong>
                    </li>

                    <li>
                      Enter your <strong>full name</strong> to
                      begin the <strong>Pre-Test</strong>.
                    </li>

                    <li>
                      Answer all <strong>20 questions honestly</strong>{" "}
                      based on your current knowledge.
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="guide-step">
                <div className="step-number">2</div>

                <div className="step-text">
                  <h3>Explore Color Vision Deficiency</h3>

                  <ul>
                    <li>
                      After submitting the Pre-Test, wait for your{" "}
                      <strong>result to be generated</strong>.
                    </li>

                    <li>
                      Click <strong>“Continue to Learn.”</strong>
                    </li>

                    <li>
                      Explore the information about{" "}
                      <strong>
                        Color Vision Deficiency (CVD)
                      </strong>
                      , including its facts and different types.
                    </li>

                    <li>
                      Read and understand the information before
                      proceeding.
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="guide-step">
                <div className="step-number">3</div>

                <div className="step-text">
                  <h3>Take the Post-Test</h3>

                  <ul>
                    <li>
                      Once you have finished exploring and
                      understanding the learning materials,
                      proceed to the <strong>Post-Test</strong>.
                    </li>

                    <li>
                      Answer all questions honestly.
                    </li>

                    <li>
                      After submitting, your{" "}
                      <strong>Post-Test result</strong> will be
                      generated.
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="guide-step">
                <div className="step-number">4</div>

                <div className="step-text">
                  <h3>Start the Ishihara Screening</h3>

                  <ul>
                    <li>
                      After your Post-Test result is generated,
                      click <strong>“Start Screening.”</strong>
                    </li>

                    <li>
                      Take the <strong>Ishihara Test</strong> to
                      check your color vision.
                    </li>

                    <li>
                      Carefully follow the instructions and answer
                      the screening items.
                    </li>

                    <li>
                      Review the{" "}
                      <strong>
                        interpretation and recommendation
                      </strong>{" "}
                      provided after the screening.
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 5 */}
              <div className="guide-step">
                <div className="step-number">5</div>

                <div className="step-text">
                  <h3>Try the Color Vision Simulator</h3>

                  <ul>
                    <li>
                      Once you have thoroughly read the screening{" "}
                      <strong>
                        interpretation and recommendation
                      </strong>
                      , proceed to the <strong>“Simulator”.</strong>
                    </li>

                    <li>
                      Upload an image of your choice.
                    </li>

                    <li>
                      Select a <strong>vision type</strong> to see
                      how the image may appear under different types
                      of color vision.
                    </li>

                    <li>
                      Compare the selected vision type with{" "}
                      <strong>normal color vision</strong>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 6 */}
              <div className="guide-step">
                <div className="step-number">6</div>

                <div className="step-text">
                  <h3>
                    Give Feedback or Contact the Research Team
                  </h3>

                  <ul>
                    <li>
                      After exploring the website, you may submit{" "}
                      <strong>feedback</strong> about your
                      experience.
                    </li>

                    <li>
                      You may also{" "}
                      <strong>
                        contact the research team
                      </strong>{" "}
                      if you have questions, need clarification,
                      or have suggestions for improving ChromAware.
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className="guide-footer">
              <p>
                Thank you for exploring ChromAware and helping
                promote greater awareness of color vision deficiency!
              </p>

              <div className="guide-footer-actions">
                <span>
                  You can open this guide again anytime using Help.
                </span>

                <button
                  className="guide-start-btn"
                  onClick={closeGuide}
                >
                  Start Exploring
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING HELP BUTTON */}
      {!isOpen && (
        <button
          className="floating-help"
          onClick={openGuide}
          aria-label="Open User Guide"
        >
          <span className="help-question">
            ?
          </span>

          <span className="help-text">
            Help
          </span>
        </button>
      )}
    </>
  );
}

export default UserGuide;