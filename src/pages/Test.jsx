import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

import "./Test.css";
import { completeFlowStep } from "../utils/flowControl";

/* =========================================================
   CHROMAWARE — AWARENESS TEST QUESTIONS
========================================================= */

const questions = [
  {
    id: 1,
    question: "What is Color Vision Deficiency (CVD)?",
    options: [
      "A. A condition where a person cannot see anything at all",
      "B. A condition where a person has difficulty distinguishing certain colors",
      "C. A condition that only affects elderly people",
      "D. A condition that makes everything look black and white",
    ],
    answer: 1,
  },

  {
    id: 2,
    question:
      "Which of the following is TRUE about Color Vision Deficiency?",
    options: [
      "A. Most people with CVD see the world only in black and white",
      "B. CVD always develops later in life due to aging",
      "C. CVD affects how a person perceives certain colors",
      "D. CVD only affects females",
    ],
    answer: 2,
  },

  {
    id: 3,
    question:
      "How is the most common type of CVD inherited?",
    options: [
      "A. Through genes on the Y chromosome",
      "B. Through genes on the X chromosome",
      "C. Through exposure to sunlight",
      "D. Through eating certain foods",
    ],
    answer: 1,
  },

  {
    id: 4,
    question: "Which statement about CVD is CORRECT?",
    options: [
      "A. CVD is a disease that can be cured with medicine",
      "B. Many people with CVD are unaware of their condition",
      "C. CVD only affects children",
      "D. CVD always causes complete loss of color vision",
    ],
    answer: 1,
  },

  {
    id: 5,
    question:
      "What are the three types of cone cells in the human eye?",
    options: [
      "A. L-cone, M-cone, and S-cone",
      "B. Red cone, Blue cone, and Green cone",
      "C. Rod, Cone, and Lens",
      "D. Small, Medium, and Large cones",
    ],
    answer: 0,
  },

  {
    id: 6,
    question:
      "What is the function of cone cells in the eye?",
    options: [
      "A. They help us see in the dark",
      "B. They detect different wavelengths of light for color vision",
      "C. They protect the eye from dust",
      "D. They help us see objects far away",
    ],
    answer: 1,
  },

  {
    id: 7,
    question:
      "The S-cone is most sensitive to which type of light?",
    options: [
      "A. Long wavelengths (red-orange)",
      "B. Medium wavelengths (green)",
      "C. Short wavelengths (blue-violet)",
      "D. Infrared light",
    ],
    answer: 2,
  },

  {
    id: 8,
    question:
      "What is the MOST COMMON type of Color Vision Deficiency?",
    options: [
      "A. Tritanopia (blue-blind)",
      "B. Protanopia (red-blind)",
      "C. Deuteranomaly (green-weak)",
      "D. Monochromacy (complete color loss)",
    ],
    answer: 2,
  },

  {
    id: 9,
    question:
      "Which type of CVD affects the L-cone (red) and makes red colors appear darker?",
    options: [
      "A. Deuteranomaly",
      "B. Protanopia",
      "C. Tritanopia",
      "D. Achromatopsia",
    ],
    answer: 1,
  },

  {
    id: 10,
    question:
      "Which type of CVD is characterized by difficulty distinguishing blue from green and yellow from red?",
    options: [
      "A. Red-green CVD",
      "B. Blue-yellow CVD",
      "C. Complete CVD",
      "D. Protanomaly",
    ],
    answer: 1,
  },

  {
    id: 11,
    question:
      "What is the most severe form of CVD where a person sees only black, white, and gray?",
    options: [
      "A. Deuteranomaly",
      "B. Protanopia",
      "C. Tritanopia",
      "D. Achromatopsia (Rod Monochromacy)",
    ],
    answer: 3,
  },

  {
    id: 12,
    question: 'What does "Deuteranomaly" affect?',
    options: [
      "A. The S-cone (blue)",
      "B. The M-cone (green)",
      "C. The L-cone (red)",
      "D. All cone cells",
    ],
    answer: 1,
  },

  {
    id: 13,
    question:
      "Which of the following is an ACQUIRED cause of CVD?",
    options: [
      "A. Inherited genes from parents",
      "B. Eye diseases like glaucoma",
      "C. Having blue eyes",
      "D. Being born prematurely",
    ],
    answer: 1,
  },

  {
    id: 14,
    question:
      "Why is red-green CVD more common in males than females?",
    options: [
      "A. Males have two X chromosomes",
      "B. Males have only one X chromosome",
      "C. Males have a different eye structure",
      "D. Males are more exposed to sunlight",
    ],
    answer: 1,
  },

  {
    id: 15,
    question:
      "Based on recent research, approximately what percentage of children and adolescents worldwide have CVD?",
    options: [
      "A. 0.5%",
      "B. 2.59%",
      "C. 10%",
      "D. 25%",
    ],
    answer: 1,
  },

  {
    id: 16,
    question:
      "Which group has the highest prevalence of CVD?",
    options: [
      "A. Females",
      "B. Males",
      "C. Both males and females equally",
      "D. Children under 5 years old",
    ],
    answer: 1,
  },

  {
    id: 17,
    question:
      "What is the name of the most common color vision test?",
    options: [
      "A. The Snellen Test",
      "B. The Ishihara Test",
      "C. The Glaucoma Test",
      "D. The Contrast Test",
    ],
    answer: 1,
  },

  {
    id: 18,
    question:
      "What does the Ishihara Test use to check for color vision deficiency?",
    options: [
      "A. Letters of different sizes",
      "B. Colored dots arranged in patterns",
      "C. Flashing lights",
      "D. Moving objects",
    ],
    answer: 1,
  },

  {
    id: 19,
    question:
      "Why can color-dependent instructional materials be challenging for students with CVD?",
    options: [
      "A. They cannot read at all",
      "B. They may have difficulty interpreting information that relies only on color",
      "C. They are unable to use computers",
      "D. They cannot see any colors",
    ],
    answer: 1,
  },

  {
    id: 20,
    question:
      "What is a good strategy for teachers to make learning materials more accessible to students with CVD?",
    options: [
      "A. Use only red and green colors",
      "B. Combine color with labels, symbols, or text",
      "C. Avoid using any colors in materials",
      "D. Make all materials black and white",
    ],
    answer: 1,
  },
];


/* =========================================================
   SCORE LEVEL
========================================================= */

const getLevel = (score) => {
  if (score >= 18) return "Excellent";
  if (score >= 14) return "Good";
  if (score >= 10) return "Fair";

  return "Needs Improvement";
};


/* =========================================================
   FEEDBACK
========================================================= */

const getFeedback = (score, testType) => {
  if (testType === "pre") {
    if (score >= 18) {
      return "You already demonstrate a strong understanding of Color Vision Deficiency and inclusive learning.";
    }

    if (score >= 14) {
      return "You have a good foundation of knowledge about Color Vision Deficiency. Continue exploring the learning materials.";
    }

    if (score >= 10) {
      return "You have some basic knowledge about Color Vision Deficiency. The ChromAware learning materials can help strengthen your understanding.";
    }

    return "This result shows that there is an opportunity to learn more about Color Vision Deficiency, color perception, and accessibility.";
  }

  if (score >= 18) {
    return "Excellent! Your post-test result demonstrates a strong understanding of Color Vision Deficiency and accessible learning practices.";
  }

  if (score >= 14) {
    return "Good work! Your result shows a good understanding of the topics discussed throughout the ChromAware learning materials.";
  }

  if (score >= 10) {
    return "You have gained some knowledge about Color Vision Deficiency. Reviewing the learning materials again may help strengthen your understanding.";
  }

  return "Keep learning! Reviewing the ChromAware educational materials can help improve your understanding of Color Vision Deficiency.";
};


/* =========================================================
   CREATE FIREBASE DOCUMENT ID
========================================================= */

const createStudentId = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};


/* =========================================================
   GET SAVED PRE-TEST
========================================================= */

const getStoredPreTest = () => {
  try {
    const stored = localStorage.getItem(
      "chromaware_pretest_result"
    );

    if (!stored) return null;

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Error reading pre-test result:",
      error
    );

    return null;
  }
};


/* =========================================================
   COMPONENT
========================================================= */

function Test() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  /* =====================================================
     TEST TYPE
  ===================================================== */

  const testType =
    searchParams.get("type") === "post"
      ? "post"
      : "pre";


  /* =====================================================
     POST-TEST ACCESS PROTECTION
  ===================================================== */

  useEffect(() => {

    if (testType !== "post") return;

    const preTestCompleted =
      localStorage.getItem(
        "chromaware_pretest_completed"
      ) === "true";

    const learningCompleted =
      localStorage.getItem(
        "chromaware_learning_completed"
      ) === "true";

    if (!preTestCompleted || !learningCompleted) {
      navigate("/learn", {
        replace: true,
      });
    }

  }, [testType, navigate]);


  /* =====================================================
     STATES
  ===================================================== */

  const [started, setStarted] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);

  const [studentName, setStudentName] =
    useState(() => {
      return (
        localStorage.getItem(
          "chromaware_student_name"
        ) || ""
      );
    });

  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [finalResult, setFinalResult] =
    useState(null);

  const [preTestResult, setPreTestResult] =
    useState(() => getStoredPreTest());


  /* =====================================================
     START TEST
  ===================================================== */

 const startTest = () => {

  const fullName = studentName.trim();

  if (fullName.length < 2) {
    alert("Please enter your complete name.");
    return;
  }

  const nameParts =
    fullName.split(/\s+/);

  if (nameParts.length < 2) {
    alert("Please enter your complete name.");
    return;
  }

  localStorage.setItem(
    "chromaware_student_name",
    fullName
  );

  setStudentName(fullName);
  setStarted(true);

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 50);
};


  /* =====================================================
     ANSWER QUESTION
  ===================================================== */

  const answerQuestion = (
    selectedAnswer
  ) => {

    let finalScore = score;

    if (
      selectedAnswer ===
      questions[current].answer
    ) {
      finalScore += 1;
    }

    setScore(finalScore);


    /* NEXT QUESTION */

    if (
      current <
      questions.length - 1
    ) {

      setCurrent((prev) =>
        prev + 1
      );

      return;
    }


    /* LAST QUESTION */

    setGenerating(true);

    setTimeout(() => {
      generateResult(finalScore);
    }, 1800);
  };


  /* =====================================================
     GENERATE + SAVE RESULT
  ===================================================== */

  const generateResult = async (
    finalScore
  ) => {

    const percentage = Math.round(
      (finalScore / questions.length) *
      100
    );

    const awarenessLevel =
      getLevel(finalScore);

    const cleanName =
      studentName.trim();

    const studentId =
      createStudentId(cleanName);


    /* SAFETY CHECK */

    if (!studentId) {

      setGenerating(false);

      alert(
        "Unable to create participant ID. Please enter your name again."
      );

      return;
    }


    try {

      /* ===============================================
         PRE-TEST
      =============================================== */

      if (testType === "pre") {

        const preResult = {
          score: finalScore,
          totalQuestions:
            questions.length,
          percentage,
          awarenessLevel,
        };


        const result = {
          name: cleanName,
          score: finalScore,
          totalQuestions:
            questions.length,
          percentage,
          awarenessLevel,
          testType: "pre",
        };


        /* SAVE TO FIREBASE FIRST */

        await setDoc(
          doc(
            db,
            "testResults",
            studentId
          ),

          {
            studentId,
            name: cleanName,

            preTest: {
              score: finalScore,

              totalQuestions:
                questions.length,

              percentage,

              awarenessLevel,

              completedAt:
                serverTimestamp(),
            },

            updatedAt:
              serverTimestamp(),
          },

          {
            merge: true,
          }
        );


        console.log(
          "PRE-TEST SAVED SUCCESSFULLY!"
        );


        /* SAVE LOCALLY */

        localStorage.setItem(
          "chromaware_pretest_result",

          JSON.stringify(preResult)
        );

        localStorage.setItem(
          "chromaware_pretest_completed",

          "true"
        );


        /* UPDATE SCREEN */

        setPreTestResult(preResult);

        setFinalResult(result);

        setGenerating(false);

        setFinished(true);


        window.dispatchEvent(
          new Event(
            "chromaware-flow-updated"
          )
        );

        return;
      }


      /* ===============================================
         POST-TEST
      =============================================== */

      if (testType === "post") {

        const savedPreTest =
          getStoredPreTest();


        const result = {

          name: cleanName,

          score: finalScore,

          totalQuestions:
            questions.length,

          percentage,

          awarenessLevel,

          testType: "post",

          preTest:
            savedPreTest,
        };


        /* SAVE TO FIREBASE FIRST */

        await setDoc(

          doc(
            db,
            "testResults",
            studentId
          ),

          {

            studentId,

            name: cleanName,

            postTest: {

              score:
                finalScore,

              totalQuestions:
                questions.length,

              percentage,

              awarenessLevel,

              completedAt:
                serverTimestamp(),
            },

            updatedAt:
              serverTimestamp(),
          },

          {
            merge: true,
          }
        );


        console.log(
          "POST-TEST SAVED SUCCESSFULLY!"
        );
completeFlowStep("POSTTEST");

        /* SAVE LOCALLY */

        localStorage.setItem(
          "chromaware_post_test_completed",
          "true"
        );


        /* UPDATE SCREEN */

        setPreTestResult(
          savedPreTest
        );

        setFinalResult(
          result
        );

        setGenerating(false);

        setFinished(true);


        window.dispatchEvent(
          new Event(
            "chromaware-flow-updated"
          )
        );
      }


    } catch (error) {

      console.error(
        "FIREBASE SAVE ERROR:",
        error
      );


      setGenerating(false);


      alert(
        "The test result could not be saved to Firebase. Please check the browser console for the exact error."
      );
    }
  };


  /* =====================================================
     PREVENT SCROLL WHILE GENERATING
  ===================================================== */

  useEffect(() => {

    if (generating) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";
    }


    return () => {

      document.body.style.overflow =
        "";
    };

  }, [generating]);


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="test-container">


      {/* RESULT GENERATING */}

      {generating && (

        <div className="result-loading-overlay">

          <div className="result-loading-card">

            <div className="brand-title">
              CHROMAWARE
            </div>


            <div className="test-type-badge">

              {testType === "pre"
                ? "PRE-TEST"
                : "POST-TEST"}

            </div>


            <div className="loading-spinner"></div>


            <h2>
              Generating Your Results
            </h2>


            <p>
              Please wait while ChromAware
              prepares your awareness
              assessment report.
            </p>


            <div className="loading-progress">

              <div className="loading-progress-bar">
              </div>

            </div>


            <span className="loading-small">
              Saving your assessment result...
            </span>

          </div>

        </div>
      )}


      {/* START SCREEN */}

      {!started &&
        !finished &&
        !generating && (

          <div className="test-start-card">


            <div className="brand-title">
              CHROMAWARE
            </div>


            <div className="test-type-badge">

              {testType === "pre"
                ? "PRE-TEST"
                : "POST-TEST"}

            </div>


            <h1>
              Color Vision Awareness
              Assessment
            </h1>


            <p>

              {testType === "pre"

                ? "This assessment measures your current knowledge about Color Vision Deficiency before exploring the ChromAware learning materials."

                : "This assessment measures what you have learned about Color Vision Deficiency after exploring the ChromAware learning materials."

              }

            </p>


            <div className="test-information">

              <div>
                <strong>20</strong>
                <span>Questions</span>
              </div>


              <div>
                <strong>15–20</strong>
                <span>Minutes</span>
              </div>


              <div>
                <strong>1</strong>
                <span>Point Each</span>
              </div>

            </div>


            <div className="input-area">

              <label>
                Participant Name
              </label>


              <input

                type="text"

                placeholder="Enter your complete name"

                value={studentName}

                onChange={(e) =>

                  setStudentName(

                    e.target.value.replace(
                      /[^a-zA-ZÀ-ÿ\s.'-]/g,
                      ""
                    )

                  )

                }

              />

            </div>


            <div className="test-note">

              <strong>
                Please answer honestly.
              </strong>


              <p>

                {testType === "pre"

                  ? "The pre-test measures your current level of awareness before learning."

                  : "The post-test measures what you learned after completing the ChromAware educational materials."

                }

              </p>

            </div>


            <button

              className="primary-btn"

              onClick={startTest}

            >

              {testType === "pre"
                ? "Begin Pre-Test"
                : "Begin Post-Test"}

            </button>

          </div>
        )}


      {/* QUESTIONS */}

      {started &&
        !finished &&
        !generating && (

          <div className="question-card">


            <div className="question-header">

              <span>

                Question {current + 1} of{" "}
                {questions.length}

              </span>


              <span>

                {Math.round(
                  ((current + 1) /
                    questions.length) *
                  100
                )}

                %

              </span>

            </div>


            <div className="quiz-progress">

              <div

                style={{
                  width: `${
                    ((current + 1) /
                      questions.length) *
                    100
                  }%`,
                }}

              ></div>

            </div>


            <div className="question-number">

              ITEM{" "}

              {String(
                current + 1
              ).padStart(
                2,
                "0"
              )}

            </div>


            <h2>
              {questions[current].question}
            </h2>


            <div className="answers">

              {questions[current].options.map(
                (option, index) => (

                  <button

                    key={index}

                    onClick={() =>
                      answerQuestion(index)
                    }

                  >

                    <span className="answer-letter">

                      {String.fromCharCode(
                        65 + index
                      )}

                    </span>


                    <span>

                      {option.replace(
                        /^[A-D]\.\s*/,
                        ""
                      )}

                    </span>

                  </button>

                )
              )}

            </div>

          </div>
        )}


      {/* RESULT */}

      {finished &&
        finalResult && (

          <div className="assessment-result">


            <p className="report-brand">
              CHROMAWARE
            </p>


            <div className="result-type">

              {testType === "pre"
                ? "PRE-TEST RESULT"
                : "POST-TEST RESULT"}

            </div>


            <h1>
              Awareness Assessment
              Report
            </h1>


            <p className="result-text">
              Thank you for completing the
              educational assessment.
            </p>


            <div className="participant-result">

              <span>
                PARTICIPANT
              </span>


              <h2>
                {finalResult.name}
              </h2>

            </div>


            {/* PRE-TEST RESULT */}

            {testType === "pre" && (

              <>

                <div className="result-score">

                  <span className="score-label">
                    PRE-TEST
                  </span>


                  <h2>

                    {finalResult.score}/
                    {finalResult.totalQuestions}

                  </h2>


                  <p>
                    Overall Score
                  </p>


                  <strong>
                    {finalResult.percentage}%
                  </strong>

                </div>


                <div className="level">

                  {finalResult.awarenessLevel}

                </div>

              </>

            )}


            {/* POST-TEST RESULT */}

            {testType === "post" && (

              <>

                <div className="score-comparison">


                  <div className="score-item">

                    <span className="score-label">
                      PRE-TEST
                    </span>


                    <span className="score-value">

                      {preTestResult

                        ? `${preTestResult.score}/${preTestResult.totalQuestions}`

                        : "N/A"

                      }

                    </span>


                    {preTestResult && (

                      <span className="score-percentage">

                        {preTestResult.percentage}%

                      </span>

                    )}

                  </div>


                  <div className="score-arrow">
                    →
                  </div>


                  <div className="score-item">

                    <span className="score-label">
                      POST-TEST
                    </span>


                    <span className="score-value">

                      {finalResult.score}/
                      {finalResult.totalQuestions}

                    </span>


                    <span className="score-percentage">

                      {finalResult.percentage}%

                    </span>

                  </div>

                </div>


                <div className="level">

                  {finalResult.awarenessLevel}

                </div>

              </>

            )}


            {/* FEEDBACK */}

            <div className="feedback">

              <h3>
                Assessment Feedback
              </h3>


              <p>

                {getFeedback(
                  finalResult.score,
                  testType
                )}

              </p>

            </div>


            {/* NEXT STEP */}

            <div className="result-next-step">

              {testType === "pre" ? (

                <Link

                  to="/learn"

                  className="next-step-btn"

                >

                  Continue to Learn

                  <span>→</span>

                </Link>

              ) : (

                <Link

                  to="/ishihara-test"

                  className="next-step-btn"

                >

                  Start Screening

                  <span>→</span>

                </Link>

              )}

            </div>

          </div>
        )}

    </div>
  );
}


export default Test;