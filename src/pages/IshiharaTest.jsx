import { useState } from "react";
import { Link } from "react-router-dom";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

import plate1 from "../assets/ishihara/plate1.png";
import plate2 from "../assets/ishihara/plate2.png";
import plate3 from "../assets/ishihara/plate3.png";
import plate4 from "../assets/ishihara/plate4.png";
import plate5 from "../assets/ishihara/plate5.png";
import plate6 from "../assets/ishihara/plate6.png";
import plate7 from "../assets/ishihara/plate7.png";
import plate8 from "../assets/ishihara/plate8.png";
import plate9 from "../assets/ishihara/plate9.png";
import plate10 from "../assets/ishihara/plate10.png";
import plate11 from "../assets/ishihara/plate11.png";
import plate12 from "../assets/ishihara/plate12.png";
import plate13 from "../assets/ishihara/plate13.png";
import plate14 from "../assets/ishihara/plate14.png";
import plate15 from "../assets/ishihara/plate15.png";
import plate16 from "../assets/ishihara/plate16.png";
import plate17 from "../assets/ishihara/plate17.png";
import plate18 from "../assets/ishihara/plate18.png";
import plate19 from "../assets/ishihara/plate19.png";
import plate20 from "../assets/ishihara/plate20.png";

import "./IshiharaTest.css";


const ishiharaQuestions = [
  { plate: plate1, answer: "12" },
  { plate: plate2, answer: "8" },
  { plate: plate3, answer: "6" },
  { plate: plate4, answer: "29" },
  { plate: plate5, answer: "57" },
  { plate: plate6, answer: "5" },
  { plate: plate7, answer: "3" },
  { plate: plate8, answer: "15" },
  { plate: plate9, answer: "74" },
  { plate: plate10, answer: "2" },
  { plate: plate11, answer: "6" },
  { plate: plate12, answer: "97" },
  { plate: plate13, answer: "45" },
  { plate: plate14, answer: "5" },
  { plate: plate15, answer: "7" },
  { plate: plate16, answer: "16" },
  { plate: plate17, answer: "73" },
  { plate: plate18, answer: "26" },
  { plate: plate19, answer: "42" },
  { plate: plate20, answer: "35" },
];


function IshiharaTest() {

  const [started, setStarted] = useState(false);

  const [participantName, setParticipantName] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswer, setUserAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [showLoading, setShowLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [saving, setSaving] = useState(false);

  const [saveError, setSaveError] = useState("");


  /* =========================================================
     START SCREENING
  ========================================================= */

  const startScreening = () => {

    if (!participantName.trim()) {
      alert("Please enter your full name first.");
      return;
    }

    setStarted(true);
  };


  /* =========================================================
     SUBMIT ANSWER
  ========================================================= */

  const submitAnswer = async () => {

    if (!userAnswer.trim()) {
      alert("Please type the number you see on the plate.");
      return;
    }
    // Numbers only
  if (!/^\d+$/.test(userAnswer.trim())) {
    alert("Please enter numbers only.");
    return;
  }

    const cleanAnswer = userAnswer.trim();

    const correctAnswer =
      ishiharaQuestions[currentQuestion].answer;

    const isCorrect =
      cleanAnswer === correctAnswer;

    const newAnswer = {
      plate: currentQuestion + 1,
      answer: cleanAnswer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect,
    };

    const updatedAnswers = [
      ...answers,
      newAnswer,
    ];

    setAnswers(updatedAnswers);


    /* =============================================
       NEXT QUESTION
    ============================================= */

    if (
      currentQuestion <
      ishiharaQuestions.length - 1
    ) {

      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");

      return;
    }


    /* =============================================
       FINISH TEST
    ============================================= */

    const score =
      updatedAnswers.filter(
        (item) => item.isCorrect
      ).length;


    const percentage = Math.round(
      (score / ishiharaQuestions.length) * 100
    );


    const screeningStatus =
      score >= 15
        ? "No significant difficulty indicated"
        : "Color vision difficulty may be indicated";


    const screeningResult = {
      score,
      total: ishiharaQuestions.length,
      percentage,
      screeningStatus,
    };


    /* Show loading screen */
    setShowLoading(true);
    setSaving(true);
    setSaveError("");


    try {

      /*
        IMPORTANT:
        The Firestore document ID will be
        exactly the participant's full name.

        Example:
        Quisha fae A. Cortez
      */

      const documentId =
        participantName.trim();


      const resultRef = doc(
        db,
        "ishiharaResults",
        documentId
      );


      await setDoc(resultRef, {

        /* Document / participant information */

        participantName:
          participantName.trim(),

        documentId:
          documentId,


        /* Screening result */

        score:
          score,

        totalPlates:
          ishiharaQuestions.length,

        percentage:
          percentage,

        screeningStatus:
          screeningStatus,


        /* Individual answers */

        answers:
          updatedAnswers,


        /* Important disclaimer */

        medicalDiagnosis: false,

        disclaimer:
          "This Ishihara screening result is for educational and awareness purposes only and is not a medical diagnosis.",


        /* Timestamp */

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),

      });


      console.log(
        "Ishihara result successfully saved!"
      );


      /*
        Small delay so the loading
        animation still appears smoothly
      */

setTimeout(() => {

  setShowLoading(false);

  setSaving(false);

  /* =========================================
     MARK SCREENING AS COMPLETED
  ========================================= */

  localStorage.setItem(
    "chromaware_screening_completed",
    "true"
  );


  /* =========================================
     TELL NAVBAR TO REFRESH FLOW STATUS
  ========================================= */

  window.dispatchEvent(
    new Event("chromaware-flow-updated")
  );


  /* =========================================
     SHOW SCREENING RESULT
  ========================================= */

  setResult(screeningResult);

}, 1800);


    } catch (error) {

      console.error(
        "Error saving Ishihara result:",
        error
      );

      setShowLoading(false);

      setSaving(false);

      setSaveError(
        "Your screening result could not be saved to the database. Please check your Firebase Firestore rules and try again."
      );

    }

  };


  /* =========================================================
     START SCREEN
  ========================================================= */

  if (!started) {

    return (

      <div className="ishihara-container">

        <div className="test-start-card">

          <div className="brand-title">
            CHROMAWARE
          </div>


          <div className="test-type-badge">
            COLOR VISION SCREENING
          </div>


          <h1>
            Ishihara Color Vision Screening
          </h1>


          <p>
            This screening uses Ishihara color plates.
            Carefully look at each plate and type the
            number that you can see.
          </p>


          <div className="test-information">

            <div>
              <strong>20</strong>
              <span>Color Plates</span>
            </div>

            <div>
              <strong>5–10</strong>
              <span>Minutes</span>
            </div>

            <div>
              <strong>Type</strong>
              <span>Your Answer</span>
            </div>

          </div>


          <div className="input-area">

            <label>
              Enter your full name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={participantName}
              onChange={(event) =>
                setParticipantName(
                  event.target.value
                )
              }
            />

          </div>


          <div className="test-note">

            <strong>
              Important Screening Notice
            </strong>

            <p>
              This Ishihara test is an educational
              screening tool only. It is not intended
              to provide a medical diagnosis.
            </p>

          </div>


          <button
            className="primary-btn"
            onClick={startScreening}
          >
            Start Screening
          </button>


        </div>

      </div>

    );

  }


  /* =========================================================
     RESULT SCREEN
  ========================================================= */

  if (result) {

    return (

      <div className="ishihara-container">

        <div className="assessment-result">


          <p className="report-brand">
            CHROMAWARE
          </p>


          <div className="result-type">
            ISHIHARA SCREENING RESULT
          </div>


          <h1>
            Your Screening Result
          </h1>


          <p className="result-text">
            Thank you for completing the Ishihara
            Color Vision Screening.
          </p>


          <div className="participant-result">

            <span>
              Participant
            </span>

            <h2>
              {participantName}
            </h2>

          </div>


          <div className="result-score">

            <h2>
              {result.score}/
              {result.total}
            </h2>

            <p>
              Correct Responses
            </p>

            <strong>
              {result.percentage}%
            </strong>

          </div>


          <div
            className={
              result.score >= 15
                ? "screening-status screening-success"
                : "screening-status screening-warning"
            }
          >

            {result.screeningStatus}

          </div>


          {/* =====================================
              IMPORTANT MEDICAL DISCLAIMER
          ===================================== */}

          <div className="feedback medical-disclaimer">

            <h3>
              ⚠ Important: This Is Not a Medical Diagnosis
            </h3>

            <p>
              This result is based only on your
              responses to this Ishihara color vision
              screening. It is intended for
              educational and awareness purposes and
              <strong>
                {" "}does not diagnose color vision
                deficiency or any other eye condition.
              </strong>
            </p>

            <p>
              If you have concerns about your color
              vision or experience difficulty
              distinguishing colors, please consult a
              qualified eye care professional for a
              complete examination and proper
              assessment.
            </p>

          </div>


          <div className="feedback educational-notice">

            <h3>
              About Your Result
            </h3>

            <p>
              Your responses may help indicate whether
              further color vision assessment could be
              beneficial. Different factors, including
              screen settings and viewing conditions,
              may affect screening results.
            </p>

          </div>


          <div className="result-next-step">

            <Link
              to="/simulator"
              className="next-step-btn"
            >
              Continue to Color Vision Simulator
              <span>→</span>
            </Link>

          </div>


          {saveError && (
            <p className="save-error">
              {saveError}
            </p>
          )}


        </div>

      </div>

    );

  }


  /* =========================================================
     QUESTION SCREEN
  ========================================================= */

  const progress =
    ((currentQuestion + 1) /
      ishiharaQuestions.length) *
    100;


  return (

    <div className="ishihara-container">

      <div className="question-card">


        <div className="question-header">

          <span>
            Question {currentQuestion + 1} of{" "}
            {ishiharaQuestions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>

        </div>


        <div className="quiz-progress">

          <div
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <div className="question-number">

          ISHIHARA PLATE{" "}
          {currentQuestion + 1}

        </div>


        <div className="plate-wrapper">

          <img
            src={
              ishiharaQuestions[
                currentQuestion
              ].plate
            }
            alt={`Ishihara Plate ${
              currentQuestion + 1
            }`}
            className="plate-image"
          />

        </div>


        <h2 className="ishihara-question-title">
          What number do you see?
        </h2>


        <div className="ishihara-answer-area">

          <label>
            Type the number you see on the plate
          </label>


          <div className="ishihara-answer-row">

            
            <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={3}
  placeholder="Type your answer"
  className="ishihara-answer-input"
  value={userAnswer}
  onChange={(event) => {

    const value = event.target.value;

    // Numbers only
    if (/^\d*$/.test(value)) {
      setUserAnswer(value);
    }

  }}
  onKeyDown={(event) => {

    if (event.key === "Enter") {
      submitAnswer();
    }

  }}
  autoFocus
/>


            <button
              className="submit-answer-btn"
              onClick={submitAnswer}
            >
              {currentQuestion ===
              ishiharaQuestions.length - 1
                ? "Finish"
                : "Next"}
            </button>

          </div>

        </div>


      </div>


      {/* =========================================
          LOADING / SAVING SCREEN
      ========================================== */}

      {showLoading && (

        <div className="result-loading-overlay">

          <div className="result-loading-card">

            <div className="loading-spinner" />

            <h2>
              {saving
                ? "Saving Your Result..."
                : "Generating Result..."}
            </h2>

            <p>
              Please wait while your Ishihara
              screening responses are being processed
              and securely saved.
            </p>

            <div className="loading-progress">

              <div className="loading-progress-bar" />

            </div>

            <span className="loading-small">
              Please do not close this page.
            </span>

          </div>

        </div>

      )}


    </div>

  );

}


export default IshiharaTest;