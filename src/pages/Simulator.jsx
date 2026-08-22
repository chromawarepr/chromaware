import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Simulator.css";

import {
  applySimulation,
  simulateColor,
} from "../utils/colorVisionSimulator";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";


function Simulator() {

  /* =========================================================
     URL PARAMETERS
  ========================================================= */

  const [searchParams] = useSearchParams();

  const selectedType =
    searchParams.get("type");


  /* =========================================================
     SIMULATOR STATES
  ========================================================= */

  const [mode, setMode] =
    useState("normal");

  const [image, setImage] =
    useState(null);

  const canvasRef =
    useRef(null);

  const imageRef =
    useRef(null);


  /* =========================================================
     FEEDBACK STATES
  ========================================================= */

  const [showFeedback, setShowFeedback] =
    useState(false);

  const [rating, setRating] =
    useState(0);

  const [hoverRating, setHoverRating] =
    useState(0);

  const [email, setEmail] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [feedbackSent, setFeedbackSent] =
    useState(false);

  // NEW:
  // Remembers that the user closed the popup
  // and wants to continue exploring first.
  const [feedbackDismissed, setFeedbackDismissed] =
    useState(false);


  /* =========================================================
     EXPLORE TRACKING
  ========================================================= */

  const [interactionCount, setInteractionCount] =
    useState(0);

  const [imageUploaded, setImageUploaded] =
    useState(false);


  /* =========================================================
     CHECK IF FEEDBACK WAS ALREADY SENT
  ========================================================= */

  useEffect(() => {

    const feedbackCompleted =
      localStorage.getItem(
        "chromaware_feedback_completed"
      );

    if (feedbackCompleted === "true") {

      setFeedbackSent(true);

    }

  }, []);


  /* =========================================================
     SET MODE FROM URL
  ========================================================= */

  useEffect(() => {

    if (selectedType) {

      setMode(
        selectedType.toLowerCase()
      );

    }

  }, [selectedType]);


  /* =========================================================
     SHOW FEEDBACK AFTER EXPLORING
  ========================================================= */

  useEffect(() => {

    // Feedback already submitted
    if (feedbackSent) return;

    // Popup is currently open
    if (showFeedback) return;

    // User closed the popup and chose
    // to continue exploring for now.
    // Do not automatically show it again.
    if (feedbackDismissed) return;


    /*
      SHOW POPUP WHEN:

      1. User uploads an image

      OR

      2. User clicks vision types
         at least 5 times
    */

    if (
      imageUploaded ||
      interactionCount >= 5
    ) {

      const timer =
        setTimeout(() => {

          setShowFeedback(true);

        }, 1200);


      return () =>
        clearTimeout(timer);

    }

  }, [
    imageUploaded,
    interactionCount,
    feedbackSent,
    feedbackDismissed,
    showFeedback,
  ]);


  /* =========================================================
     VISION TYPES
  ========================================================= */

  const visions = [

    {
      id: "normal",
      title: "Normal Vision",
      desc: "Typical color perception",
    },

    {
      id: "protanopia",
      title: "Protanopia",
      desc: "Complete red deficiency",
    },

    {
      id: "protanomaly",
      title: "Protanomaly",
      desc: "Reduced red sensitivity",
    },

    {
      id: "deuteranopia",
      title: "Deuteranopia",
      desc: "Complete green deficiency",
    },

    {
      id: "deuteranomaly",
      title: "Deuteranomaly",
      desc: "Reduced green sensitivity",
    },

    {
      id: "tritanopia",
      title: "Tritanopia",
      desc: "Complete blue deficiency",
    },

    {
      id: "tritanomaly",
      title: "Tritanomaly",
      desc: "Reduced blue sensitivity",
    },

    {
      id: "achromatopsia",
      title: "Achromatopsia",
      desc: "Complete color blindness",
    },

    {
      id: "achromatomaly",
      title: "Achromatomaly",
      desc: "Partial monochromatic vision",
    },

  ];


  /* =========================================================
     BASE COLOR PALETTE
  ========================================================= */

  const basePalette = [

    ["Red", "#FF0000"],
    ["Orange", "#FF9500"],
    ["Yellow", "#FFFF00"],
    ["Green", "#00FF00"],
    ["Cyan", "#18D8DE"],
    ["Blue", "#001AFF"],
    ["Purple", "#8A00FF"],
    ["Magenta", "#FF00FF"],
    ["Pink", "#F25AA9"],
    ["Brown", "#944D16"],
    ["Olive", "#808000"],
    ["Teal", "#148989"],
    ["Navy", "#11138D"],
    ["Maroon", "#980000"],
    ["Lime", "#32CD32"],
    ["Coral", "#FF7F50"],

  ];


  /* =========================================================
     RGB TO HEX
  ========================================================= */

  function rgbToHex(r, g, b) {

    return (

      "#" +

      [r, g, b]
        .map((value) => {

          const hex = Math.max(
            0,
            Math.min(
              255,
              Math.round(value)
            )
          )
            .toString(16);

          return hex.length === 1
            ? "0" + hex
            : hex;

        })
        .join("")

    );

  }


  /* =========================================================
     SIMULATE HEX COLOR
  ========================================================= */

  function simulateHex(hex) {

    const r =
      parseInt(
        hex.slice(1, 3),
        16
      );

    const g =
      parseInt(
        hex.slice(3, 5),
        16
      );

    const b =
      parseInt(
        hex.slice(5, 7),
        16
      );


    const [nr, ng, nb] =
      simulateColor(
        r,
        g,
        b,
        mode
      );


    return rgbToHex(
      nr,
      ng,
      nb
    );

  }


  /* =========================================================
     SIMULATED PALETTE
  ========================================================= */

  const palette =
    basePalette.map(
      ([name, hex]) => {

        const r =
          parseInt(
            hex.slice(1, 3),
            16
          );

        const g =
          parseInt(
            hex.slice(3, 5),
            16
          );

        const b =
          parseInt(
            hex.slice(5, 7),
            16
          );


        const [nr, ng, nb] =
          simulateColor(
            r,
            g,
            b,
            mode
          );


        return [

          name,

          rgbToHex(
            nr,
            ng,
            nb
          ),

        ];

      }
    );


  /* =========================================================
     IMAGE SIMULATION
  ========================================================= */

  useEffect(() => {

    if (
      !image ||
      !canvasRef.current
    ) {

      return;

    }


    const img =
      new Image();


    img.onload = () => {

      imageRef.current =
        img;


      applySimulation(
        img,
        canvasRef.current,
        mode
      );

    };


    img.src = image;

  }, [
    image,
    mode,
  ]);


  /* =========================================================
     SELECT VISION TYPE
  ========================================================= */

  const handleVisionSelect =
    (visionId) => {

      setMode(
        visionId
      );


      setInteractionCount(
        (previous) =>
          previous + 1
      );

    };


  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handleImageUpload =
    (event) => {

      const file =
        event.target.files[0];


      if (!file) return;


      setImage(
        URL.createObjectURL(file)
      );


      setImageUploaded(true);

    };


  /* =========================================================
     EMAIL VALIDATION
  ========================================================= */

  const validEmail =
    (value) => {

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      return emailPattern.test(
        value
      );

    };


  /* =========================================================
     SUBMIT FEEDBACK TO FIREBASE
  ========================================================= */

  const submitFeedback =
    async (event) => {

      event.preventDefault();


      /* CHECK RATING */

      if (rating === 0) {

        alert(
          "Please select your rating."
        );

        return;

      }


      /* CHECK EMAIL */

      if (
        !validEmail(
          email.trim()
        )
      ) {

        alert(
          "Please enter a valid email address."
        );

        return;

      }


      setSubmitting(true);


      try {

        await addDoc(

          collection(
            db,
            "simulatorFeedback"
          ),

          {

            email:
              email.trim(),

            rating:
              rating,

            comment:
              comment.trim(),

            simulatorMode:
              mode,

            interactions:
              interactionCount,

            imageUploaded:
              imageUploaded,

            createdAt:
              serverTimestamp(),

          }

        );


        /*
          PREVENT POPUP AND FLOATING BUTTON
          FROM APPEARING AGAIN
        */

        localStorage.setItem(
          "chromaware_feedback_completed",
          "true"
        );


        setFeedbackSent(true);

        setFeedbackDismissed(false);

        setShowFeedback(false);


        /*
          RESET FORM
        */

        setRating(0);

        setHoverRating(0);

        setEmail("");

        setComment("");


        alert(
          "Thank you for your feedback! Your response has been submitted successfully."
        );


      } catch (error) {

        console.error(
          "Feedback error:",
          error
        );


        alert(
          "Unable to submit your feedback. Please try again."
        );


      } finally {

        setSubmitting(false);

      }

    };


  /* =========================================================
     CLOSE FEEDBACK
  ========================================================= */

  const closeFeedback =
    () => {

      // Close the popup
      setShowFeedback(false);

      // Remember that the user wants
      // to continue exploring first
      setFeedbackDismissed(true);

    };


  /* =========================================================
     REOPEN FEEDBACK
  ========================================================= */

  const reopenFeedback =
    () => {

      // Remove dismissed state
      setFeedbackDismissed(false);

      // Open feedback popup again
      setShowFeedback(true);

    };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="simulator-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="sim-header">

        <p className="small-title">
          INTERACTIVE EXPERIENCE
        </p>


        <h1>
          Color Blindness Simulator
        </h1>


        <p className="sim-description">

          Experience how people with different
          types of color vision deficiency
          see the world.

          <br />

          Select a vision type below to begin
          the simulation.

        </p>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="instructions">

        <div className="instructions-card">


          <div className="instructions-header">

            <span className="instructions-tag">
              HOW IT WORKS
            </span>


            <h2>
              Using the Color Blindness Simulator
            </h2>


            <p>

              Explore how different types of
              Color Vision Deficiency (CVD)
              may affect color perception.
              Follow these simple steps to
              experience the simulation.

            </p>

          </div>


          <div className="steps-grid">


            {/* STEP 1 */}

            <div className="step-card">

              <div className="step-number">
                1
              </div>


              <h3>
                Select a Vision Type
              </h3>


              <p>

                Choose one of the available
                vision types and explore how
                colors may appear under each
                condition.

              </p>

            </div>


            {/* STEP 2 */}

            <div className="step-card">

              <div className="step-number">
                2
              </div>


              <h3>
                Upload an Image
              </h3>


              <p>

                Upload any image from your
                device.

                ChromAware will display an
                approximation of how it may
                appear under the selected
                vision type.

              </p>

            </div>


            {/* STEP 3 */}

            <div className="step-card">

              <div className="step-number">
                3
              </div>


              <h3>
                Compare the Results
              </h3>


              <p>

                Switch between vision types
                to compare color perception,
                explore the color palette,
                and observe the traffic light
                simulation.

              </p>

            </div>

          </div>


          <div className="instruction-note">

            <strong>
              Educational Notice
            </strong>


            <p>

              This simulator is designed for
              educational awareness only.
              The simulation is an
              approximation and may not
              exactly match the visual
              experience of every individual
              with Color Vision Deficiency.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION TYPES
      ===================================================== */}

      <section className="vision-container">

        {visions.map(
          (vision) => (

            <div

              key={vision.id}

              className={
                mode === vision.id
                  ? "vision-card active"
                  : "vision-card"
              }

              onClick={() =>
                handleVisionSelect(
                  vision.id
                )
              }

            >


              <div className="vision-icon">

                {mode === vision.id
                  ? "✓"
                  : "👁"}

              </div>


              <h3>
                {vision.title}
              </h3>


              <p>
                {vision.desc}
              </p>

            </div>

          )
        )}

      </section>


      {/* =====================================================
          NOTICE
      ===================================================== */}

      <div className="notice">

        <span>
          ⓘ
        </span>


        <p>

          <strong>
            Note:
          </strong>

          {" "}

          This simulation is an
          approximation and may not
          perfectly represent every
          person's experience with
          Color Vision Deficiency.

        </p>

      </div>


      {/* =====================================================
          COLOR PALETTE
      ===================================================== */}

      <section className="palette">

        <h2>
          Color Palette
        </h2>


        <div className="color-grid">

          {palette.map(
            (color) => (

              <div
                className="color-item"
                key={color[0]}
              >

                <div

                  className="color-box"

                  style={{
                    background:
                      color[1],
                  }}

                />


                <p>
                  {color[0]}
                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          IMAGE SIMULATION
      ===================================================== */}

      <section className="simulation-image">

        <h2>
          Image Simulation
        </h2>


        <div className="upload-box">

          <input

            type="file"

            accept="image/*"

            onChange={
              handleImageUpload
            }

          />

        </div>


        {image ? (

          <div className="comparison-grid">


            {/* NORMAL IMAGE */}

            <div className="comparison-card">

              <h3>
                Normal Vision
              </h3>


              <img

                src={image}

                alt="Normal Vision"

                className="comparison-image"

              />

            </div>


            {/* SIMULATED IMAGE */}

            <div className="comparison-card">

              <h3>

                {
                  visions.find(
                    (vision) =>
                      vision.id === mode
                  )?.title
                }

              </h3>


              <canvas

                ref={canvasRef}

                className="comparison-image"

              />

            </div>

          </div>

        ) : (

          <div className="preview">

            <p>
              Upload an image to begin
              the simulation.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          TRAFFIC LIGHT
      ===================================================== */}

      <section className="traffic-card">

        <h2>
          Traffic Light Recognition
        </h2>


        <p className="traffic-text">

          Many people with Color Vision
          Deficiency rely on the position
          of traffic lights instead of
          color alone.

        </p>


        <div
          className={`traffic-light ${mode}`}
        >


          {/* STOP */}

          <div className="light-wrapper">

            <span

              className="light"

              style={{
                background:
                  simulateHex(
                    "#ff0000"
                  ),
              }}

            />


            <p>
              Stop
            </p>

          </div>


          {/* CAUTION */}

          <div className="light-wrapper">

            <span

              className="light"

              style={{
                background:
                  simulateHex(
                    "#ffff00"
                  ),
              }}

            />


            <p>
              Caution
            </p>

          </div>


          {/* GO */}

          <div className="light-wrapper">

            <span

              className="light"

              style={{
                background:
                  simulateHex(
                    "#00ff00"
                  ),
              }}

            />


            <p>
              Go
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FLOATING FEEDBACK BUTTON

          Appears after the user clicks:
          ✕ OR Maybe Later
      ===================================================== */}

      {feedbackDismissed &&
        !feedbackSent &&
        !showFeedback && (

          <button

            className="floating-feedback-btn"

            onClick={
              reopenFeedback
            }

            type="button"

          >

            <span className="floating-feedback-icon">
              💬
            </span>

            <span>
              Give Feedback
            </span>

          </button>

        )}


      {/* =====================================================
          FEEDBACK POPUP
      ===================================================== */}

      {showFeedback && (

        <div className="feedback-overlay">

          <div className="feedback-modal">


            {/* CLOSE */}

            <button

              className="feedback-close"

              onClick={
                closeFeedback
              }

              type="button"

              aria-label="Close feedback"

            >
              ✕
            </button>


            {/* HEADER */}

            <div className="feedback-header">

              <span className="feedback-eyebrow">
                YOUR FEEDBACK
              </span>


              <h2>
                How was your experience?
              </h2>


              <p>

                You've finished exploring
                the ChromAware Color
                Blindness Simulator.

                Your feedback will help us
                improve the experience.

              </p>

            </div>


            {/* FORM */}

            <form

              className="feedback-form"

              onSubmit={submitFeedback}

            >


              {/* RATING */}

              <div className="rating-section">

                <label>
                  Rate your experience
                </label>


                <div className="star-rating">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <button

                        key={star}

                        type="button"

                        className={
                          star <=
                          (
                            hoverRating ||
                            rating
                          )
                            ? "active"
                            : ""
                        }

                        onClick={() =>
                          setRating(star)
                        }

                        onMouseEnter={() =>
                          setHoverRating(
                            star
                          )
                        }

                        onMouseLeave={() =>
                          setHoverRating(0)
                        }

                        aria-label={
                          `${star} star rating`
                        }

                      >
                        ★
                      </button>

                    )
                  )}

                </div>


                {rating > 0 && (

                  <small>
                    You selected {rating} out of 5.
                  </small>

                )}

              </div>


              {/* EMAIL */}

              <div className="feedback-group">

                <label htmlFor="feedback-email">

                  Gmail / Email Address

                  <span className="feedback-optional">
                    {" "}*
                  </span>

                </label>


                <input

                  id="feedback-email"

                  className="feedback-input"

                  type="email"

                  placeholder="example@gmail.com"

                  value={email}

                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }

                  required

                />


                <small className="feedback-note">

                  Your email may be used only
                  for follow-up regarding
                  your feedback.

                </small>

              </div>


              {/* COMMENT */}

              <div className="feedback-group">

                <label htmlFor="feedback-comment">

                  Comments or Suggestions

                  <span className="feedback-optional">
                    {" "}Optional
                  </span>

                </label>


                <textarea

                  id="feedback-comment"

                  className="feedback-textarea"

                  placeholder="Tell us what you liked or what we can improve..."

                  value={comment}

                  onChange={(event) =>
                    setComment(
                      event.target.value
                    )
                  }

                  rows="5"

                />

              </div>


              {/* BUTTONS */}

              <div className="feedback-actions">


                <button

                  type="button"

                  className="feedback-skip-btn"

                  onClick={
                    closeFeedback
                  }

                  disabled={submitting}

                >
                  Maybe Later
                </button>


                <button

                  type="submit"

                  className="feedback-submit-btn"

                  disabled={submitting}

                >

                  {submitting
                    ? "Submitting..."
                    : "Submit Feedback"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default Simulator;