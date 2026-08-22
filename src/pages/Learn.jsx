import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeFlowStep } from "../utils/flowControl";

import {
  FaEye,
  FaBookOpen,
  FaDna,
  FaLightbulb,
  FaCircle,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaMobileAlt,
  FaGraduationCap,
  FaUniversalAccess,
  FaBrain,
  FaFlask,
  FaChartBar,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBalanceScale,
  FaTimes,
} from "react-icons/fa";

import eyeAnatomy from "../assets/eye-anatomy.png";
import "../pages/Learn.css";

/* =========================================================
   FACT CARDS
========================================================= */

const factCards = [
  {
    title: "Common Condition",
    icon: <FaEye />,
    short:
      "Millions of people worldwide experience some form of color vision deficiency.",
    detail:
      "Recent global meta-analyses confirm that CVD is a widespread variation in human vision. Jeong et al. (2025) analyzed more than 1.7 million children and adolescents across 21 countries and estimated the global prevalence of congenital CVD at 2.59%.",
    source: "Jeong et al. (2025)",
  },
  {
    title: "Mostly Inherited",
    icon: <FaDna />,
    short:
      "Many types of CVD are caused by genetic changes affecting cone cells.",
    detail:
      "The most common red-green deficiencies are typically inherited through genes on the X chromosome. Changes involving the OPN1LW and OPN1MW genes can affect the photopigments of L- and M-cones.",
    source: "Naifeh & Kaufman (2022); National Eye Institute (2025)",
  },
  {
    title: "Not Only Black and White",
    icon: <FaCircle />,
    short:
      "Most people with CVD still see colors, but some shades appear different.",
    detail:
      "The brain determines color by comparing overlapping signals from the S-, M-, and L-cones. Different forms of CVD change this comparison, causing some colors to appear more similar, darker, lighter, or shifted.",
    source: "Purves et al. (2001); National Eye Institute (2023)",
  },
  {
    title: "Better Design Matters",
    icon: <FaUniversalAccess />,
    short:
      "Accessible colors, labels, and symbols improve learning for everyone.",
    detail:
      "Educational materials should not depend on color alone. Shapes, patterns, text labels, and brightness contrast can work together with color to make information more accessible.",
    source:
      "DepEd Order No. 21, s. 2019; UNESCO Guidelines on Inclusion",
  },
];

/* =========================================================
   CONE CARDS
========================================================= */

const coneCards = [
  {
    name: "L-Cone",
    subtitle: "Long wavelength",
    colorClass: "red",
    description:
      "L-cones respond most strongly to longer wavelengths of light and contribute to the perception of colors commonly associated with red.",
  },
  {
    name: "M-Cone",
    subtitle: "Medium wavelength",
    colorClass: "green",
    description:
      "M-cones respond most strongly to medium wavelengths and contribute strongly to the perception of colors commonly associated with green.",
  },
  {
    name: "S-Cone",
    subtitle: "Short wavelength",
    colorClass: "blue",
    description:
      "S-cones respond most strongly to shorter wavelengths and contribute strongly to the perception of colors commonly associated with blue.",
  },
];

/* =========================================================
   CVD TYPES
========================================================= */

const cvdTypes = [
  {
    group: "Red-Green Color Vision Deficiency",
    groupDescription:
      "The most common type of CVD. It occurs when the L-cone (red) or M-cone (green) cells do not function normally.",
    cards: [
      {
        name: "Protanomaly",
        cone: "L-Cone (Red)",
        severity: "Mild",
        description:
          "The red cone pigment is present but has an altered spectral sensitivity, shifting its peak sensitivity toward the medium-wavelength spectrum.",
        detail:
          "In Protanomaly, the L-cone photopigment is altered, causing it to respond more similarly to the M-cone than it normally should. This can reduce the ability to differentiate reds, oranges, and yellows. All three cone types are present, but one has shifted sensitivity.",
        impact:
          "Daily activities are usually unaffected, although distinguishing ripe fruits or reading color-coded charts may sometimes be challenging.",
        source:
          "Naifeh & Kaufman (2022); National Eye Institute (2023)",
        tag: "#C9A227",
      },
      {
        name: "Protanopia",
        cone: "L-Cone (Red)",
        severity: "Severe",
        description:
          "The red cone photopigment is completely missing or non-functional, leaving the L-cone system inactive.",
        detail:
          "Protanopia is a form of dichromacy in which the visual system relies on M-cones and S-cones. Without a functional L-cone system, distinguishing red, green, and yellow hues can become difficult. Red objects may also appear noticeably darker.",
        impact:
          "Color-coded charts, traffic signals, maps, and objects distinguished primarily by red may be difficult to interpret.",
        source:
          "Purves et al. (2001); National Eye Institute (2023)",
        tag: "#173F35",
      },
      {
        name: "Deuteranomaly",
        cone: "M-Cone (Green)",
        severity: "Mild",
        description:
          "The green cone pigment is present but has altered spectral sensitivity, shifting its peak toward the long-wavelength spectrum.",
        detail:
          "In Deuteranomaly, the M-cone opsin is altered, causing its response to become more similar to the L-cone. Greens, yellows, and reds can therefore become harder to distinguish.",
        impact:
          "Many individuals remain undiagnosed because the condition is mild, although color-coded charts and similar materials can sometimes be challenging.",
        source:
          "Jeong et al. (2025); National Eye Institute (2023)",
        tag: "#28594D",
      },
      {
        name: "Deuteranopia",
        cone: "M-Cone (Green)",
        severity: "Severe",
        description:
          "The green cone photopigment is completely missing or non-functional.",
        detail:
          "Deuteranopia is another form of dichromacy. Only L-cone and S-cone signals remain available for color processing, leading to significant confusion between greens, reds, browns, and pinks.",
        impact:
          "Traffic lights, charts, maps, graphs, and other materials relying on red-green distinctions may be difficult to interpret.",
        source:
          "Naifeh & Kaufman (2022); National Eye Institute (2023)",
        tag: "#173F35",
      },
    ],
  },
  {
    group: "Blue-Yellow Color Vision Deficiency",
    groupDescription:
      "A rarer type involving the S-cone (blue) cells. It can affect the ability to distinguish between blue and green, and yellow and red.",
    cards: [
      {
        name: "Tritanomaly",
        cone: "S-Cone (Blue)",
        severity: "Mild",
        description:
          "The S-cone pigment has reduced sensitivity or is slightly shifted, causing blue to appear greener.",
        detail:
          "Tritanomaly is a rare form of anomalous trichromacy affecting the S-cone system. Individuals may confuse blue with green and yellow with red.",
        impact:
          "Color-coded maps, diagrams, charts, and objects using blue-yellow differences may sometimes be difficult to distinguish.",
        source: "National Eye Institute (2023, 2025)",
        tag: "#2563EB",
      },
      {
        name: "Tritanopia",
        cone: "S-Cone (Blue)",
        severity: "Severe",
        description:
          "The S-cone photopigment is completely missing, rendering the short-wavelength system inactive.",
        detail:
          "Tritanopia is a rare form of dichromacy where color processing relies primarily on L-cone and M-cone signals. Blue and yellow wavelengths are therefore difficult to differentiate.",
        impact:
          "Materials depending on blue-yellow distinctions, including certain charts, diagrams, maps, and interfaces, may be challenging.",
        source: "National Eye Institute (2023, 2025)",
        tag: "#2563EB",
      },
    ],
  },
  {
    group: "Full Color Vision Loss",
    groupDescription:
      "A very rare condition where cone cells provide little or no color information.",
    cards: [
      {
        name: "Cone Monochromacy",
        cone: "Multiple Cone Types",
        severity: "Severe",
        description:
          "Only one type of cone, usually S-cones, functions properly while the other two cone types are non-functional.",
        detail:
          "In Cone Monochromacy, the retina has lost the ability to effectively use two of its three cone photopigments. Blue-cone monochromacy, for example, leaves S-cones functioning while the L- and M-cone systems are severely affected.",
        impact:
          "Color identification can become a significant daily challenge, especially in environments that depend heavily on color.",
        source:
          "Purves et al. (2001); National Eye Institute (2023)",
        tag: "#28594D",
      },
      {
        name: "Rod Monochromacy / Achromatopsia",
        cone: "All Cone Types",
        severity: "Complete",
        description:
          "No cone cells provide normal color information. Vision is primarily dependent on rods, resulting in a monochromatic visual experience.",
        detail:
          "Achromatopsia is an extremely rare condition involving severely impaired cone function. People with achromatopsia may experience markedly reduced color perception along with light sensitivity and reduced visual acuity.",
        impact:
          "Bright environments and activities requiring color identification can create substantial everyday challenges.",
        source:
          "National Eye Institute (2023); Purves et al. (2001)",
        tag: "#173F35",
      },
    ],
  },
];

/* =========================================================
   CAUSES
========================================================= */

const causeCards = [
  {
    title: "Genetic (Inherited) Causes",
    icon: <FaDna />,
    text:
      "The most common kinds of color vision deficiency are genetic, meaning they are passed down from parents to their children through genes on chromosomes. If color vision deficiency is genetic, color vision generally remains stable over time.",
    extra:
      "Red-green color vision deficiency is commonly inherited through genes on the X chromosome. This helps explain why red-green CVD is more common in males, who typically have only one X chromosome.",
  },
  {
    title: "Acquired Causes",
    icon: <FaFlask />,
    text:
      "Color vision deficiency can also develop later in life if the eyes or the parts of the brain responsible for processing color become damaged. Common causes include:",
    list: [
      "Eye diseases — such as glaucoma and age-related macular degeneration (AMD).",
      "Brain and nervous system diseases — such as Alzheimer's disease or multiple sclerosis (MS).",
      "Some medicines — including medicines that may affect visual function.",
      "Eye or brain injuries — including retinal detachment and certain tumors.",
    ],
  },
];

const prevalenceData = [
  { label: "Overall", value: 2.59 },
  { label: "Males", value: 4.38 },
  { label: "Females", value: 0.64 },
];

/* =========================================================
   FACT FLASH CARD
========================================================= */

function FlashCard({ card }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`learn-flashcard ${active ? "active" : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className="flash-front">
        <div className="flash-icon">{card.icon}</div>

        <h3>{card.title}</h3>

        <p>{card.short}</p>

        <span className="flash-hint">
          Tap to learn more
        </span>
      </div>

      <div className="flash-back">
        <span className="flash-label">
          LEARN MORE
        </span>

        <h3>{card.title}</h3>

        <p>{card.detail}</p>

        <small>{card.source}</small>

        <span className="flash-close">
          <FaChevronUp />
          Tap to close
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   CVD CARD
========================================================= */

function CVDCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`cvd-flashcard ${open ? "open" : ""}`}>
      <div className="cvd-card-top">
        <span
          className="cvd-tag"
          style={{ background: card.tag }}
        >
          {card.severity}
        </span>

        <h3>{card.name}</h3>

        <div className="cvd-meta">
          <div>
            <span>Affected Cone</span>
            <strong>{card.cone}</strong>
          </div>

          <div>
            <span>Severity</span>
            <strong>{card.severity}</strong>
          </div>
        </div>

        <p className="cvd-short">
          {card.description}
        </p>

        <button
          type="button"
          className="learn-more-button"
          onClick={() => setOpen(!open)}
        >
          <FaBookOpen />

          {open ? "Show Less" : "Learn More"}

          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {open && (
        <div className="cvd-expanded">
          <p>{card.detail}</p>

          <div className="daily-impact">
            <strong>Daily Impact</strong>
            <p>{card.impact}</p>
          </div>

          <div className="source-text">
            {card.source}
          </div>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   LEARN PAGE
========================================================= */

export default function Learn() {
  const navigate = useNavigate();

  /* =====================================================
     COMPLETION STATES
  ===================================================== */

  const [learningCompleted, setLearningCompleted] =
    useState(
      localStorage.getItem(
        "chromaware_learning_completed"
      ) === "true"
    );

  const [postTestCompleted, setPostTestCompleted] =
    useState(
      localStorage.getItem(
        "chromaware_post_test_completed"
      ) === "true"
    );

  const [showCompletionPopup, setShowCompletionPopup] =
    useState(false);

  const [showPostTestButton, setShowPostTestButton] =
    useState(
      localStorage.getItem(
        "chromaware_learning_completed"
      ) === "true" &&
      localStorage.getItem(
        "chromaware_post_test_completed"
      ) !== "true"
    );

  const [popupShown, setPopupShown] =
    useState(
      localStorage.getItem(
        "chromaware_learning_popup_shown"
      ) === "true"
    );

  /* =====================================================
     SECTION STATES
  ===================================================== */

  const [showColorExplanation, setShowColorExplanation] =
    useState(false);

  const [
    showLearningExplanation,
    setShowLearningExplanation,
  ] = useState(false);

  const [
    showPolicyExplanation,
    setShowPolicyExplanation,
  ] = useState(false);

  /* =====================================================
     CHECK POST TEST STATUS

     Re-check kapag bumalik ang user sa page.
  ===================================================== */

  useEffect(() => {
    const completed =
      localStorage.getItem(
        "chromaware_post_test_completed"
      ) === "true";

    setPostTestCompleted(completed);

    if (completed) {
      setShowPostTestButton(false);
      setShowCompletionPopup(false);
    }
  }, []);

  /* =====================================================
     DETECT END OF LEARNING PAGE
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const currentPostTestStatus =
        localStorage.getItem(
          "chromaware_post_test_completed"
        ) === "true";

      if (currentPostTestStatus) {
        setPostTestCompleted(true);
        setShowPostTestButton(false);
        setShowCompletionPopup(false);
        return;
      }

      const scrollPosition =
        window.innerHeight + window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight;

      if (
        scrollPosition >= pageHeight - 200 &&
        !learningCompleted &&
        !currentPostTestStatus
      ) {
        setLearningCompleted(true);

        localStorage.setItem(
          "chromaware_learning_completed",
          "true"
        );

        if (!popupShown) {
          setShowCompletionPopup(true);

          setPopupShown(true);

          localStorage.setItem(
            "chromaware_learning_popup_shown",
            "true"
          );
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [learningCompleted, popupShown]);

  /* =====================================================
     TAKE POST TEST
  ===================================================== */

  const handleTakePostTest = () => {
    localStorage.setItem(
      "chromaware_learning_completed",
      "true"
    );

    completeFlowStep("LEARNING");

    setLearningCompleted(true);

    setShowCompletionPopup(false);
    setShowPostTestButton(false);

    navigate("/test?type=post");
  };

  /* =====================================================
     CONTINUE REVIEWING

     Close popup then show floating button.
  ===================================================== */

  const handleContinueReview = () => {
    if (postTestCompleted) return;

    localStorage.setItem(
      "chromaware_learning_completed",
      "true"
    );

    setLearningCompleted(true);

    setShowCompletionPopup(false);

    setShowPostTestButton(true);
  };

  return (
    <main className="learn-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="learn-new-hero">
        <div className="learn-hero-content">
          <span className="learn-label">
            CHROMAWARE LEARNING CENTER
          </span>

          <h1>
            Understanding
            <br />
            <span>Color Vision</span>
            <br />
            Deficiency
          </h1>

          <p>
            Color Vision Deficiency (CVD) is not a disease—it is a
            variation in how the human visual system detects and
            processes color. Understanding CVD is the first step
            toward creating learning environments where information
            remains accessible to everyone, regardless of how they
            perceive color.
          </p>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        <div className="learn-hero-visual">
          <div className="eye-visual-glow"></div>

          <div className="eye-image-card">
            <img
              src={eyeAnatomy}
              alt="Human eye anatomy diagram"
              className="eye-anatomy-image"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 02
      ========================================= */}

      <section className="learn-section facts-new-section">
        <div className="section-heading">
          <span>SECTION 02</span>

          <h2>
            Color Vision Deficiency Facts
          </h2>

          <p>
            Tap each card to discover more about color vision
            deficiency.
          </p>
        </div>

        <div className="facts-new-grid">
          {factCards.map((card) => (
            <FlashCard
              key={card.title}
              card={card}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 03
      ========================================= */}

      <section className="learn-section color-new-section">
        <div className="section-heading color-section-heading">
          <span>SECTION 03</span>

          <h2>How Humans See Color</h2>

          <p className="color-intro-text">
            Human color vision is made possible by three types of cone
            photoreceptors found in the retina: S-cones, M-cones, and
            L-cones. These cone cells work together to help the brain
            recognize and interpret different colors.
          </p>

          {showColorExplanation && (
            <div className="color-expanded-explanation">
              <p>
                Human color vision depends on three types of cone
                photoreceptors found in the retina: S-cones for short
                wavelengths, M-cones for medium wavelengths, and
                L-cones for long wavelengths.
              </p>

              <p>
                These cone types do not work independently by detecting
                only one specific color. Instead, they respond to
                overlapping ranges of light wavelengths.
              </p>

              <p>
                The brain compares signals produced by the different
                cone systems and uses this information to create the
                colors we perceive.
              </p>

              <small>
                Purves et al. (2001); Naifeh & Kaufman (2022)
              </small>
            </div>
          )}

          <button
            type="button"
            className="color-learn-more-btn"
            onClick={() =>
              setShowColorExplanation(
                !showColorExplanation
              )
            }
          >
            <FaBookOpen />

            {showColorExplanation
              ? "SHOW LESS"
              : "LEARN MORE"}

            {showColorExplanation
              ? <FaChevronUp />
              : <FaChevronDown />}
          </button>
        </div>

        <div className="cone-new-grid">
          {coneCards.map((cone) => (
            <article
              key={cone.name}
              className={`cone-new-card ${cone.colorClass}`}
            >
              <div className="cone-circle">
                <FaCircle />
              </div>

              <span>{cone.subtitle}</span>

              <h3>{cone.name}</h3>

              <p>{cone.description}</p>
            </article>
          ))}
        </div>

        <div className="perception-new-card">
          <div className="perception-icon">
            <FaBrain />
          </div>

          <div className="perception-content">
            <span>VISUAL PERCEPTION THEORY</span>

            <h3>Gestalt Theory</h3>

            <p>
              Visual Perception Theory (Gestalt Theory) explains how
              individuals interpret and organize visual stimuli such as
              color, contrast, grouping, and clarity. When certain
              colors are difficult to distinguish, the overall
              organization and meaning of visual materials may be
              altered.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 04
      ========================================= */}

      <section className="learn-section types-new-section">
        <div className="section-heading">
          <span>SECTION 04</span>

          <h2>
            Types of Color Vision Deficiency
          </h2>

          <p>
            Color vision deficiency can affect different cone systems
            and range from mild changes in color perception to severe
            color vision loss.
          </p>
        </div>

        <div className="cvd-groups-new">
          {cvdTypes.map((group) => (
            <div
              className="cvd-group-new"
              key={group.group}
            >
              <div className="group-heading">
                <span>COLOR VISION CATEGORY</span>

                <h3>{group.group}</h3>

                <p>
                  {group.groupDescription}
                </p>
              </div>

              <div className="cvd-new-grid">
                {group.cards.map((card) => (
                  <CVDCard
                    key={card.name}
                    card={card}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 05
      ========================================= */}

      <section className="learn-section causes-new-section">
        <div className="section-heading">
          <span>SECTION 05</span>

          <h2>
            Causes of Color Vision Deficiency
          </h2>

          <p>
            The causes of CVD may be either genetic or acquired.
          </p>
        </div>

        <div className="causes-new-grid">
          {causeCards.map((cause) => (
            <article
              className="cause-new-card"
              key={cause.title}
            >
              <div className="cause-new-icon">
                {cause.icon}
              </div>

              <h3>{cause.title}</h3>

              <p>{cause.text}</p>

              {cause.extra && (
                <div className="cause-highlight">
                  {cause.extra}
                </div>
              )}

              {cause.list && (
                <ul>
                  {cause.list.map((item) => (
                    <li key={item}>
                      <FaCheckCircle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="acquired-note">
          <FaInfoCircle />

          <div>
            <strong>Age and Treatment</strong>

            <p>
              Additionally, color vision may worsen with age,
              especially if cataracts develop. Unlike genetic CVD,
              acquired CVD may be treatable depending on the
              underlying cause.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 06
      ========================================= */}

      <section className="learn-section prevalence-new-section">
        <div className="section-heading">
          <span>SECTION 06</span>

          <h2>How Common is CVD?</h2>

          <p>
            Recent research provides updated information about the
            prevalence of color vision deficiency worldwide.
          </p>
        </div>

        <div className="research-stat-card">
          <div className="research-stat-icon">
            <FaChartBar />
          </div>

          <div>
            <strong>1,703,619</strong>

            <p>
              children and adolescents were included in the systematic
              review and meta-analysis by Jeong et al. (2025).
            </p>

            <small>
              56 studies • 21 countries • 5 continents
            </small>
          </div>
        </div>

        <div className="bar-chart-card">
          {prevalenceData.map((item) => (
            <div
              className="prevalence-bar"
              key={item.label}
            >
              <div className="bar-title">
                <span>{item.label}</span>

                <strong>
                  {item.value}%
                </strong>
              </div>

              <div className="bar-background">
                <div
                  className="bar-progress"
                  style={{
                    width: `${(item.value / 5) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="research-source">
          Jeong et al. (2025) — Global prevalence estimates for
          congenital color vision deficiency.
        </p>
      </section>

      {/* =========================================
          SECTION 07
      ========================================= */}

      <section className="learn-section testing-new-section">
        <div className="section-heading">
          <span>SECTION 07</span>

          <h2>
            Testing for Color Vision Deficiency
          </h2>

          <p>
            Several methods exist for identifying color vision
            deficiency, ranging from simple screening tools to
            comprehensive diagnostic assessments.
          </p>
        </div>

        <div className="testing-main-card">
          <div className="testing-main-icon">
            <FaEye />
          </div>

          <div>
            <span>
              THE MOST WIDELY USED SCREENING METHOD
            </span>

            <h3>The Ishihara Test</h3>

            <p>
              The Ishihara Color Vision Test, developed by Dr.
              Shinobu Ishihara in 1917, consists of a series of plates
              containing colored dots arranged in patterns.
            </p>

            <p>
              Individuals with normal color vision can identify numbers
              or shapes embedded in the dots, while those with Color
              Vision Deficiency may see different numbers or none at
              all.
            </p>
          </div>
        </div>

        <div className="smartphone-card">
          <div className="phone-icon">
            <FaMobileAlt />
          </div>

          <div>
            <span className="testing-sub-label">
              MODERN SCREENING METHODS
            </span>

            <h3>
              Digital and Smartphone-Based Ishihara Testing
            </h3>

            <p>
              Recent research has demonstrated that presenting Ishihara
              plates on smartphone displays can produce results
              comparable to traditional screen-based methods.
            </p>

            <div className="testing-results">
              <div>
                <span>PC SCREEN</span>
                <strong>94.4%</strong>
                <small>Sensitivity</small>

                <div className="result-divider"></div>

                <strong>82.4%</strong>
                <small>Specificity</small>
              </div>

              <div>
                <span>SMARTPHONE</span>
                <strong>96.0%</strong>
                <small>Sensitivity</small>

                <div className="result-divider"></div>

                <strong>94.7%</strong>
                <small>Specificity</small>
              </div>
            </div>

            <p className="testing-conclusion">
              Smartphone-based Ishihara testing is useful for
              screening large groups and can achieve results comparable
              to traditional screen presentation methods.
            </p>
          </div>
        </div>

        <div className="testing-warning">
          <FaExclamationTriangle />

          <div>
            <strong>Important Note</strong>

            <p>
              The ChromAware screening activities are inspired by the
              Ishihara Test and are intended solely for awareness and
              educational purposes. They are not a substitute for
              professional eye examinations or medical diagnosis.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 08 — CVD AND LEARNING
      ========================================= */}

      <section className="learning-new-section">
        <div className="learning-new-inner">
          <div className="learning-big-icon">
            <FaGraduationCap />
          </div>

          <span className="learning-section-label">
            SECTION 08
          </span>

          <h2>CVD and Learning</h2>

          <p className="learning-main-description">
            Color vision deficiency can significantly influence how
            students interact with educational materials, yet it often
            goes unrecognized in schools. Understanding these impacts
            is essential for creating inclusive learning environments.
          </p>

          <button
            type="button"
            className="learning-learn-more-btn"
            onClick={() =>
              setShowLearningExplanation(
                !showLearningExplanation
              )
            }
          >
            <FaBookOpen />

            {showLearningExplanation
              ? "SHOW LESS"
              : "LEARN MORE"}

            {showLearningExplanation
              ? <FaChevronUp />
              : <FaChevronDown />}
          </button>

          {showLearningExplanation && (
            <div className="learning-expanded-content">

              <article className="learning-info-block">
                <div className="learning-info-icon">
                  <FaLightbulb />
                </div>

                <div>
                  <h3>
                    The Hidden Barrier in Education
                  </h3>

                  <p>
                    Color is widely used in educational settings to
                    organize information, emphasize key concepts, and
                    improve engagement. However, when instructional
                    materials rely exclusively on color to convey
                    meaning, students with CVD may face unintentional
                    barriers to learning.
                  </p>
                </div>
              </article>

              <article className="learning-prevalence-card">
                <div className="learning-prevalence-icon">
                  <FaChartBar />
                </div>

                <div>
                  <h3>
                    Prevalence in the Classroom
                  </h3>

                  <p>
                    With approximately{" "}
                    <strong>
                      1 in every 30 students
                    </strong>{" "}
                    based on the 2.59% global prevalence having some
                    form of CVD, it is highly likely that an average
                    classroom may include a student with color vision
                    deficiency.
                  </p>
                </div>
              </article>

              <div className="learning-impact-heading">
                <h3>
                  Academic and Social-Emotional Impacts
                </h3>

                <p>
                  Research has documented several ways CVD can affect
                  students.
                </p>
              </div>

              <div className="learning-impact-grid">

                <article className="learning-impact-card">
                  <div className="learning-impact-icon">
                    <FaBrain />
                  </div>

                  <h3>Academic Challenges</h3>

                  <ul>
                    <li>
                      <FaCheckCircle />
                      <span>
                        Difficulty interpreting color-coded charts,
                        graphs, and maps
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Struggling with laboratory results that rely on
                        color indicators
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Challenges with multimedia content where color
                        is the primary differentiator
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Potential difficulties in literacy acquisition
                        for color-dependent learning materials
                      </span>
                    </li>
                  </ul>
                </article>

                <article className="learning-impact-card social-impact-card">
                  <div className="learning-impact-icon">
                    <FaUniversalAccess />
                  </div>

                  <h3>
                    Social-Emotional Consequences
                  </h3>

                  <p>
                    Frequent failure at color-related tasks can lead to
                    academic frustration and social-emotional problems.
                  </p>

                  <ul>
                    <li>
                      <FaCheckCircle />
                      <span>
                        Embarrassed or frustrated when unable to
                        complete color-dependent assignments
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Hesitant to ask for help due to lack of
                        awareness about their condition
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        At risk of being teased or bullied
                      </span>
                    </li>
                  </ul>
                </article>

              </div>

              <div className="learning-awareness-note">
                <FaLightbulb />

                <p>
                  As researchers have emphasized, teachers should be
                  made aware of color vision deficiency, as this
                  awareness may guide them to offer inclusive support to
                  learners with CVD.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          SECTION 09 — LEGAL AND POLICY FRAMEWORK
      ========================================= */}

      <section className="policy-new-section">
        <div className="policy-new-inner">

          <div className="policy-big-icon">
            <FaBalanceScale />
          </div>

          <span className="policy-section-label">
            SECTION 09
          </span>

          <h2>
            Legal and Policy Framework
          </h2>

          <p className="policy-main-description">
            ChromAware is developed in alignment with national and
            international policies that affirm the right to inclusive
            education for all learners, including those with color
            vision differences.
          </p>

          <button
            type="button"
            className="policy-learn-more-btn"
            onClick={() =>
              setShowPolicyExplanation(
                !showPolicyExplanation
              )
            }
          >
            <FaBookOpen />

            {showPolicyExplanation
              ? "SHOW LESS"
              : "LEARN MORE"}

            {showPolicyExplanation
              ? <FaChevronUp />
              : <FaChevronDown />}
          </button>

          {showPolicyExplanation && (
            <div className="policy-expanded-content">

              <div className="policy-category-heading">
                <span>
                  PHILIPPINE LEGAL FRAMEWORK
                </span>

                <h3>
                  Laws Supporting Inclusive Education
                </h3>

                <p>
                  Philippine laws recognize the importance of
                  participation, support, and equal access to education
                  for persons with disabilities and learners with
                  different needs.
                </p>
              </div>

              <div className="policy-framework-grid">

                <article className="policy-framework-card">
                  <div className="policy-card-number">
                    01
                  </div>

                  <span>
                    REPUBLIC ACT NO. 7277
                  </span>

                  <h3>
                    Magna Carta for Disabled Persons
                  </h3>

                  <small>1992</small>

                  <ul>
                    <li>
                      <FaCheckCircle />
                      <span>
                        Declares that disabled persons are part of
                        Philippine society and deserve support for their
                        participation and integration.
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        The State shall provide support for improving
                        their total well-being and integration into
                        mainstream society.
                      </span>
                    </li>
                  </ul>
                </article>

                <article className="policy-framework-card">
                  <div className="policy-card-number">
                    02
                  </div>

                  <span>
                    REPUBLIC ACT NO. 9442
                  </span>

                  <h3>
                    Amending RA 7277
                  </h3>

                  <small>2007</small>

                  <ul>
                    <li>
                      <FaCheckCircle />
                      <span>
                        Mandates educational assistance for persons with
                        disabilities pursuing primary, secondary,
                        tertiary, and vocational education.
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Supports access to quality education and
                        opportunities to develop skills and abilities.
                      </span>
                    </li>
                  </ul>
                </article>

                <article className="policy-framework-card featured-policy-card">
                  <div className="policy-card-number">
                    03
                  </div>

                  <span>
                    REPUBLIC ACT NO. 11650
                  </span>

                  <h3>
                    Inclusive Education Act
                  </h3>

                  <small>2022</small>

                  <ul>
                    <li>
                      <FaCheckCircle />
                      <span>
                        Institutes a policy of inclusion and services for
                        learners with disabilities.
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Affirms equitable and quality access to
                        education.
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Mandates the creation of Inclusive Learning
                        Resource Centers.
                      </span>
                    </li>

                    <li>
                      <FaCheckCircle />
                      <span>
                        Requires educational institutions to comply with
                        the requirements established under the law.
                      </span>
                    </li>
                  </ul>
                </article>
              </div>

              <div className="policy-category-heading deped-heading">
                <span>DEPED POLICIES</span>

                <h3>
                  Supporting Learners in Basic Education
                </h3>

                <p>
                  Department of Education policies provide guidance for
                  identifying, supporting, and ensuring meaningful
                  participation of learners.
                </p>
              </div>

              <div className="deped-policy-grid">

                <article className="deped-policy-card">
                  <div className="deped-policy-icon">
                    <FaEye />
                  </div>

                  <div>
                    <span>
                      DEPED ORDER NO. 23, S. 2022
                    </span>

                    <h3>
                      Child Find Policy
                    </h3>

                    <p>
                      Establishes a systematic process for identifying
                      learners with disabilities and determining
                      appropriate educational support.
                    </p>
                  </div>
                </article>

                <article className="deped-policy-card">
                  <div className="deped-policy-icon">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <span>
                      DEPED ORDER NO. 44, S. 2021
                    </span>

                    <h3>
                      Educational Programs for Learners with
                      Disabilities
                    </h3>

                    <p>
                      Ensures equal opportunities to fully participate
                      in the K to 12 Basic Education Program.
                    </p>
                  </div>
                </article>

              </div>

              <article className="udl-policy-card">
                <div className="udl-policy-icon">
                  <FaUniversalAccess />
                </div>

                <div className="udl-policy-content">
                  <span>
                    UNIVERSAL DESIGN FOR LEARNING
                  </span>

                  <h3>
                    Reducing Barriers Through Flexible Learning
                  </h3>

                  <p>
                    Universal Design for Learning provides flexibility
                    in how information is presented, how students
                    respond, and how they engage with learning.
                  </p>

                  <div className="udl-points">
                    <div>
                      <FaCheckCircle />
                      <span>
                        Provides multiple ways for information to be
                        presented and understood.
                      </span>
                    </div>

                    <div>
                      <FaCheckCircle />
                      <span>
                        Allows flexibility in how learners participate
                        and demonstrate understanding.
                      </span>
                    </div>

                    <div>
                      <FaCheckCircle />
                      <span>
                        Helps reduce unnecessary barriers and supports
                        appropriate accommodations.
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              <div className="chromaware-policy-heading">
                <span>
                  WHAT THIS MEANS FOR CHROMAWARE
                </span>

                <h3>
                  Turning Inclusive Education into Practice
                </h3>

                <p>
                  ChromAware supports these principles by promoting
                  awareness and encouraging accessible ways of
                  presenting educational information.
                </p>
              </div>

              <div className="chromaware-support-grid">

                <article className="chromaware-support-card">
                  <div>
                    <FaLightbulb />
                  </div>

                  <p>
                    Promoting awareness of color vision differences as
                    part of inclusive education.
                  </p>
                </article>

                <article className="chromaware-support-card">
                  <div>
                    <FaBookOpen />
                  </div>

                  <p>
                    Providing accessible educational content about CVD
                    to students, teachers, and the school community.
                  </p>
                </article>

                <article className="chromaware-support-card">
                  <div>
                    <FaUniversalAccess />
                  </div>

                  <p>
                    Encouraging instructional materials that do not rely
                    on color alone.
                  </p>
                </article>

                <article className="chromaware-support-card">
                  <div>
                    <FaGraduationCap />
                  </div>

                  <p>
                    Supporting equitable access to quality education for
                    every learner.
                  </p>
                </article>

              </div>

              <div className="policy-awareness-note">
                <FaBalanceScale />

                <div>
                  <strong>
                    Inclusion Begins with Awareness
                  </strong>

                  <p>
                    By recognizing that learners perceive visual
                    information differently, schools and educators can
                    take meaningful steps toward reducing barriers and
                    creating learning environments where more students
                    can participate, understand, and succeed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          LEARNING COMPLETION POPUP

          Shows only if:
          - User reached bottom
          - Post-Test is NOT completed
      ========================================= */}

      {showCompletionPopup && !postTestCompleted && (
        <div className="learning-popup-overlay">
          <div className="learning-completion-popup">

            <button
              type="button"
              className="popup-close-btn"
              onClick={handleContinueReview}
              aria-label="Close popup"
            >
              <FaTimes />
            </button>

            <div className="completion-popup-icon">
              <FaGraduationCap />
            </div>

            <span className="completion-popup-label">
              LEARNING COMPLETE
            </span>

            <h2>
              You've finished the Learning Center!
            </h2>

            <p>
              You can take the Post-Test now, or continue reviewing the
              lessons. If you continue reviewing, the Post-Test button
              will remain available whenever you're ready.
            </p>

            <div className="completion-popup-actions">
              <button
                type="button"
                className="popup-review-btn"
                onClick={handleContinueReview}
              >
                CONTINUE TO REVIEW
              </button>

              <button
                type="button"
                className="popup-post-btn"
                onClick={handleTakePostTest}
              >
                TAKE POST TEST
                <FaArrowRight />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          FLOATING POST-TEST BUTTON

          Shows only if:
          - Learning is completed
          - User closed popup / returned to Learn
          - Post-Test is NOT yet completed
      ========================================= */}

      {showPostTestButton &&
        !showCompletionPopup &&
        !postTestCompleted && (
          <div className="floating-post-test">

            <div className="floating-post-test-text">
            

           
            </div>

            <button
              type="button"
              onClick={handleTakePostTest}
              className="floating-post-test-btn"
            >
              TAKE POST TEST
              <FaArrowRight />
            </button>

          </div>
        )}

    </main>
  );
}