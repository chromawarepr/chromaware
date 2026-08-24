import { useState } from "react";
import logo from "../assets/logo.png";
import quishaPhoto from "../assets/researchers/quisha.png";
import angelicaPhoto from "../assets/researchers/angelica.png";
import jeanPhoto from "../assets/researchers/jean.png";
import "./AboutPage.css";

function AboutPage() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: "learning",
      number: "01",
      title: "Interactive Learning",
      shortDescription:
        "Explore the fundamentals of Color Vision Deficiency through organized and accessible educational content.",
      fullDescription: (
        <>
          <p>
            ChromAware provides educational materials that introduce users to
            the fundamentals of Color Vision Deficiency. Users can explore what
            CVD is, its different types, possible causes, and how it may affect
            everyday visual experiences.
          </p>

          <p>
            The National Eye Institute identifies red-green CVD as the most
            common type, followed by less common blue-yellow deficiencies and
            rare forms involving complete color vision deficiency. Presenting
            these concepts in an organized and accessible format allows users
            to develop a clearer understanding of the condition.
          </p>
        </>
      ),
      source: "National Eye Institute (2023). Types of Color Vision Deficiency.",
    },
    {
      id: "assessment",
      number: "02",
      title: "Awareness Assessment",
      shortDescription:
        "Assess your understanding of Color Vision Deficiency before and after exploring the learning materials.",
      fullDescription: (
        <>
          <p>
            ChromAware includes an Awareness Test designed to assess users'
            understanding of Color Vision Deficiency before and after exploring
            the educational materials. This feature allows users to reflect on
            what they already know and determine how their understanding
            changes after learning about CVD.
          </p>

          <p>
            The assessment is intended for educational awareness rather than
            medical diagnosis. Its purpose is to encourage users to engage with
            the information and recognize important concepts related to color
            vision deficiency.
          </p>
        </>
      ),
      source:
        "ChromAware educational awareness assessment. Designed for awareness and learning purposes only.",
    },
    {
      id: "ishihara",
      number: "03",
      title: "Ishihara Screening",
      shortDescription:
        "Experience an educational Ishihara-based color plate screening activity for awareness purposes.",
      fullDescription: (
        <>
          <p>
            ChromAware provides an Ishihara Test feature based on the
            well-known color plate approach used for color vision screening.
            Color plate testing commonly asks individuals to identify numbers,
            shapes, or lines formed by colored dots.
          </p>

          <p>
            Recent evidence further supports the usefulness of Ishihara testing.
            Zhang et al. (2025) reported favorable diagnostic performance for
            detecting CVD, with a pooled sensitivity of 0.89 and specificity of
            0.99 in their network meta-analysis.
          </p>

          <p>
            However, because ChromAware is an educational platform, its
            Ishihara-based activity should be understood as a screening and
            awareness feature only. It is not a substitute for a professional
            eye examination or clinical diagnosis.
          </p>
        </>
      ),
      source:
        "National Eye Institute (2024); Zhang et al. (2025). Diagnostic Performance of Color Vision Tests for Color Vision Deficiency.",
    },
    {
      id: "simulator",
      number: "04",
      title: "Color Vision Simulator",
      shortDescription:
        "Explore visual representations that demonstrate how color perception may vary between individuals.",
      fullDescription: (
        <>
          <p>
            ChromAware provides an interactive Color Vision Simulator that
            allows users to explore how visual information may appear under
            different types of color vision deficiency. Rather than simply
            reading about CVD, users can interact with visual representations
            that demonstrate how differences in color perception may affect the
            appearance of colors and images.
          </p>

          <p>
            This feature supports experiential learning by allowing users to
            observe color differences directly. It also reinforces the
            understanding that CVD does not necessarily mean a complete absence
            of color.
          </p>

          <p>
            Most individuals with CVD can see colors but may have difficulty
            distinguishing particular colors, shades, or levels of brightness.
          </p>
        </>
      ),
      source: "National Eye Institute (2025). Color Blindness.",
    },
  ];

  const toggleFeature = (id) => {
    setActiveFeature(activeFeature === id ? null : id);
  };

  return (
    <div className="about-page">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">ABOUT CHROMAWARE</span>

          <h1>
            Empowering Awareness of
            <span> Color Vision Deficiency</span>
          </h1>

          <p className="about-hero-description">
            ChromAware is an interactive educational website developed to
            promote awareness and understanding of Color Vision Deficiency
            (CVD) through accessible learning materials, interactive
            simulations, educational screening, and awareness assessment.
          </p>

          <div className="about-hero-note">
            <span className="note-line"></span>

            <p>
              Designed to make learning about color vision more engaging,
              understandable, and accessible.
            </p>
          </div>
        </div>

        <div className="about-logo-area">
          <div className="about-logo-glow"></div>

          <div className="about-logo-card">
            <img src={logo} alt="ChromAware Logo" />
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT / INTRODUCTION
      ====================================================== */}

      <section className="about-introduction-section">
        <div className="about-section-container about-intro-layout">
          <div className="section-label-wrapper">
            <span className="section-tag">OUR PURPOSE</span>
          </div>

          <div className="about-intro-content">
            <h2>Understanding Why Awareness Matters</h2>

            <p>
              Color vision deficiency affects how individuals distinguish
              certain colors. Although many people adapt to differences in
              color perception, the condition may create difficulties when
              information relies heavily on color alone.
            </p>

            <p>
              By presenting reliable information and interactive activities in
              one platform, ChromAware aims to make learning about CVD more
              engaging, understandable, and accessible. The website brings
              together educational resources, visual exploration, screening
              activities, and awareness assessment to encourage a broader
              understanding of color vision differences.
            </p>

            <div className="inline-source">
              <span>Source</span>
              <p>National Eye Institute (NEI), 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PURPOSE OF CHROMAWARE
      ====================================================== */}

      <section className="purpose-section">
        <div className="about-section-container">
          <div className="center-section-header">
            <span className="section-tag">PURPOSE OF CHROMAWARE</span>

            <h2>Learning Beyond Color</h2>

            <p>
              Creating greater understanding and awareness through accessible
              and interactive educational experiences.
            </p>
          </div>

          <div className="purpose-content-card">
            <p>
              The primary purpose of ChromAware is to increase awareness and
              understanding of Color Vision Deficiency among students,
              educators, and communities. The website provides users with
              opportunities to learn about how human color vision works,
              understand the different types and causes of CVD, explore how
              color may be perceived differently, and participate in
              educational screening activities.
            </p>

            <p>
              ChromAware focuses not only on identifying possible color vision
              differences but also on education and awareness. Through its
              learning resources, simulations, and assessment activities, the
              website encourages users to better understand CVD and recognize
              the importance of presenting information in ways that do not
              depend on color alone.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT CHROMAWARE OFFERS
      ====================================================== */}

      <section className="features-section-new">
        <div className="about-section-container">
          <div className="center-section-header">
            <span className="section-tag">EXPLORE THE PLATFORM</span>

            <h2>What ChromAware Offers</h2>

            <p>
              Select a feature to learn more about its purpose and supporting
              research information.
            </p>
          </div>

          <div className="features-list">
            {features.map((feature) => {
              const isOpen = activeFeature === feature.id;

              return (
                <article
                  className={`feature-expand-card ${
                    isOpen ? "feature-open" : ""
                  }`}
                  key={feature.id}
                >
                  <button
                    type="button"
                    className="feature-card-button"
                    onClick={() => toggleFeature(feature.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="feature-number">
                      {feature.number}
                    </span>

                    <div className="feature-card-main">
                      <h3>{feature.title}</h3>
                      <p>{feature.shortDescription}</p>
                    </div>

                    <span className="feature-toggle">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="feature-expanded-content">
                      <div className="expanded-text">
                        {feature.fullDescription}
                      </div>

                      <div className="feature-source-box">
                        <span>Research Source</span>
                        <p>{feature.source}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="faq-section">
        <div className="about-section-container">
          <div className="center-section-header">
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>

            <h2>Questions About ChromAware</h2>
          </div>

          <div className="faq-grid">
            <article className="faq-card">
              <span className="faq-number">01</span>

              <h3>Is ChromAware a medical diagnostic tool?</h3>

              <p>
                No. ChromAware is designed for educational and awareness
                purposes only and should not replace a professional eye
                examination or medical diagnosis.
              </p>
            </article>

            <article className="faq-card">
              <span className="faq-number">02</span>

              <h3>Is the Ishihara Screening a clinical diagnosis?</h3>

              <p>
                No. The Ishihara-based activity on ChromAware is an
                educational screening and awareness feature. Users who have
                concerns about their color vision should consult a qualified
                eye care professional.
              </p>
            </article>

            <article className="faq-card">
              <span className="faq-number">03</span>

              <h3>Who can use ChromAware?</h3>

              <p>
                ChromAware is intended for students, educators, and community
                members who want to learn more about Color Vision Deficiency
                and accessible ways of presenting visual information.
              </p>
            </article>

            <article className="faq-card">
              <span className="faq-number">04</span>

              <h3>Who developed ChromAware?</h3>

              <p>
                ChromAware was developed as a Grade 12 STEM research project
                by students from Tanauan City Integrated High School.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESEARCH INFORMATION
      ====================================================== */}

      <section className="research-section-new">
        <div className="about-section-container">
          <div className="research-information-layout">
            <div className="research-info-heading">
              <span className="section-tag">RESEARCH INFORMATION</span>

              <h2>The Research Behind ChromAware</h2>

              <p>
                ChromAware was developed as an educational research project
                combining technology, awareness, and accessible learning.
              </p>
            </div>

            <div className="research-details-card">
              <div className="research-detail">
                <span>Research Title</span>
                <strong>
                  ChromAware: An Interactive Educational Website for Color
                  Blindness Awareness
                </strong>
              </div>

              <div className="research-detail">
                <span>Institution</span>
                <strong>Tanauan City Integrated High School</strong>
              </div>

              <div className="research-detail">
                <span>Academic Strand</span>
                <strong>
                  Science, Technology, Engineering and Mathematics (STEM)
                </strong>
              </div>

              <div className="research-detail">
                <span>Academic Year</span>
                <strong>2025 – 2026</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESEARCH TEAM
      ====================================================== */}

      <section className="research-team-section-new">
        <div className="about-section-container">
          <div className="center-section-header">
            <span className="section-tag">RESEARCH TEAM</span>

            <h2>Meet the Research Team</h2>

            <p>
              ChromAware was developed by Grade 12 STEM students from Tanauan
              City Integrated High School.
            </p>
          </div>

          <div className="research-team-grid">
            <article className="research-member">
              <div className="member-photo">
                <img
                  src={quishaPhoto}
                  alt="Cortez, Quisha Fae A."
                />
              </div>

              <div className="member-info">

                <h3>Cortez, Quisha Fae A.</h3>

                <h4>Lead Developer • Researcher</h4>

                <p>
                  
                </p>
              </div>
            </article>

            <article className="research-member">
              <div className="member-photo">
                <img
                  src={angelicaPhoto}
                  alt="Fresnoza, Maria Angelica A."
                />
              </div>

              <div className="member-info">
      

                <h3>Fresnoza, Maria Angelica A.</h3>

                <h4>Researcher</h4>

                <p>
                  
                </p>
              </div>
            </article>

            <article className="research-member">
              <div className="member-photo">
                <img
                  src={jeanPhoto}
                  alt="Catilo, Jean Andrei B."
                />
              </div>

              <div className="member-info">
               

                <h3>Catilo, Jean Andrei B.</h3>

                <h4>Researcher</h4>

                <p>
                  
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          REFERENCES
      ====================================================== */}

      <section className="references-section">
        <div className="references-container">
          <span className="section-tag">REFERENCES</span>

          <h2>Research References</h2>

          <div className="references-list">
            <p>
              Jeong, Y. D., et al. (2025). <i>Global prevalence of congenital
              color vision deficiency among children and adolescents,
              1932–2022.</i> Ophthalmology, 132(12), 1431–1444.
            </p>

            <p>
              National Eye Institute. (2023). <i>Types of color vision
              deficiency.</i> National Institutes of Health.
            </p>

            <p>
              National Eye Institute. (2025). <i>Color blindness.</i> National
              Institutes of Health.
            </p>

            <p>
              Purves, D., et al. (2001). <i>Neuroscience: Cones and color
              vision.</i> National Center for Biotechnology Information.
            </p>

            <p>
              Zhang, N., et al. (2025). Diagnostic performance of color vision
              tests for color vision deficiency: A network meta-analysis.{" "}
              <i>International Ophthalmology, 45</i>, 208.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;