import { useState } from "react";
import "./Contact.css";

import quisha from "../assets/researchers/quisha.png";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (/^[A-Za-z\s'-]*$/.test(value)) {
        setForm((prev) => ({
          ...prev,
          name: value,
        }));
      }
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please complete all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message.trim().length < 10) {
      alert("Message should contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "feedback"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert("Thank you for your feedback!");

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="contact-page">

    {/* ================= HERO ================= */}

    <section className="contact-hero">

      <p className="contact-tag">
        CHROMAWARE RESEARCH
      </p>

      <h1>Contact the Research Team</h1>

      <p className="hero-description">
        We appreciate your interest in ChromAware. Whether you have
        questions, suggestions, or feedback, we welcome your message.
        Your insights help us improve our educational platform and
        promote greater awareness of Color Vision Deficiency.
      </p>

    </section>

    
    {/* ================= CONTACT INFO ================= */}

    <section className="contact-info">

      <h2>Contact Information</h2>

      <div className="contact-grid">

        <div className="contact-card">

          <div className="contact-icon">📧</div>

          <h3>Email</h3>

          <p>chromaware.pr@gmail.com</p>

          <span>
            For inquiries, feedback, and collaboration.
          </span>

        </div>

        <div className="contact-card">

          <div className="contact-icon">🎓</div>

          <h3>Research Project</h3>

          <p>ChromAware</p>

          <span>
            Interactive Educational Website for Color Blindness Awareness.
          </span>

        </div>

        <div className="contact-card">

          <div className="contact-icon">🏫</div>

          <h3>Institution</h3>

          <p>Tanauan City Integrated High School</p>

          <span>
            Science, Technology, Engineering and Mathematics (STEM)
          </span>

        </div>

      </div>

    </section>

  

    {/* ================= FEEDBACK ================= */}
          {/* ================= FEEDBACK ================= */}

    <section className="feedback-section">

      <div className="feedback-header">

        <p className="section-tag">
          CONTACT FORM
        </p>

        <h2>Send Us Your Feedback</h2>

        <p>
          Your comments, questions, and suggestions are valuable to us.
          They help improve ChromAware and contribute to creating a more
          accessible educational experience for everyone.
        </p>

      </div>

      <div className="feedback-container">

        {/* LEFT */}

        <div className="feedback-info">

          <div className="info-box">

            <h3>Why Your Feedback Matters</h3>

            <p>
              Every response we receive helps evaluate the effectiveness
              of ChromAware as an educational website for Color Blindness
              Awareness.
            </p>

          </div>

          <div className="info-box">

            <h3>Response Time</h3>

            <p>
              We regularly review all submitted feedback and use it to
              improve future versions of the project.
            </p>

          </div>

          <div className="info-box">

            <h3>Privacy</h3>

            <p>
              Information submitted through this form is used solely for
              research communication and project improvement.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="feedback-card">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Feedback Message
              </label>

              <textarea
                name="message"
                rows="7"
                placeholder="Share your feedback, questions, or suggestions..."
                value={form.message}
                onChange={handleChange}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Send Feedback"}
            </button>

          </form>

        </div>

      </div>

    </section>

  </div>
);

}

export default Contact;