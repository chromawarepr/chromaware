import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/schoollogo.png";

import {
  getFlowStatus,
} from "../utils/flowControl";

function Navbar() {
  const [flowStatus, setFlowStatus] =
    useState(getFlowStatus());

  const [menuOpen, setMenuOpen] =
    useState(false);

  /* =========================================================
     REFRESH FLOW STATUS
  ========================================================= */

  const checkFlowStatus = () => {
    setFlowStatus(getFlowStatus());
  };

  useEffect(() => {
    checkFlowStatus();

    window.addEventListener(
      "storage",
      checkFlowStatus
    );

    window.addEventListener(
      "chromaware-flow-updated",
      checkFlowStatus
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkFlowStatus
      );

      window.removeEventListener(
        "chromaware-flow-updated",
        checkFlowStatus
      );
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================================================
     HANDLE LOCKED NAVIGATION
  ========================================================= */

  const handleNavigation = (
    e,
    allowed,
    message
  ) => {
    if (!allowed) {
      e.preventDefault();

      alert(message);

      setMenuOpen(false);

      return;
    }

    setMenuOpen(false);
  };

  /* =========================================================
     PERMISSIONS

     ONCE UNLOCKED = STAYS UNLOCKED
  ========================================================= */

  const awarenessUnlocked =
    flowStatus.awarenessUnlocked;

  const learnUnlocked =
    flowStatus.preTest;

  const ishiharaUnlocked =
    flowStatus.postTest;

  const simulatorUnlocked =
    flowStatus.screening;

  /* =========================================================
     LOCK MESSAGES
  ========================================================= */

  const lockedMessage = (section) => {
    switch (section) {
      case "awareness":
        return "Please start the Awareness Test from the Home page first.";

      case "learn":
        return "Please complete the Pre-Test before accessing the Learn Center.";

      case "ishihara":
        return "Please complete the Post-Test before starting the Color Vision Screening.";

      case "simulator":
        return "Please complete the Color Vision Screening before accessing the Simulator.";

      default:
        return "Please complete the previous step first.";
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <nav className="navbar">

      {/* LOGO */}

      <NavLink
        to="/"
        end
        className="logo"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="School logo"
        />

        <h1>ChromAware</h1>
      </NavLink>

      {/* MOBILE MENU BUTTON */}

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* NAVIGATION */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* HOME */}

        <NavLink
          to="/"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Home
        </NavLink>

        {/* LEARN */}

        <NavLink
          to="/learn"
          onClick={(e) =>
            handleNavigation(
              e,
              learnUnlocked,
              lockedMessage("learn")
            )
          }
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            } ${
              !learnUnlocked
                ? "nav-locked"
                : ""
            }`
          }
        >
          Learn
        </NavLink>

        {/* AWARENESS TEST */}

        <NavLink
          to="/test"
          onClick={(e) =>
            handleNavigation(
              e,
              awarenessUnlocked,
              lockedMessage("awareness")
            )
          }
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            } ${
              !awarenessUnlocked
                ? "nav-locked"
                : ""
            }`
          }
        >
          Awareness Test
        </NavLink>

        {/* ISHIHARA TEST */}

        <NavLink
          to="/ishihara-test"
          onClick={(e) =>
            handleNavigation(
              e,
              ishiharaUnlocked,
              lockedMessage("ishihara")
            )
          }
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            } ${
              !ishiharaUnlocked
                ? "nav-locked"
                : ""
            }`
          }
        >
          Ishihara Test
        </NavLink>

        {/* SIMULATOR */}

        <NavLink
          to="/simulator"
          onClick={(e) =>
            handleNavigation(
              e,
              simulatorUnlocked,
              lockedMessage("simulator")
            )
          }
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            } ${
              !simulatorUnlocked
                ? "nav-locked"
                : ""
            }`
          }
        >
          Simulator
        </NavLink>

        {/* ABOUT */}

        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          About
        </NavLink>

        {/* CONTACT */}

        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Contact
        </NavLink>

      </div>

      {/* FLOW STATUS */}

      <div className="nav-flow-status">

        {!flowStatus.awarenessUnlocked && (
          <>Start Awareness Test</>
        )}

        {flowStatus.awarenessUnlocked &&
          !flowStatus.preTest && (
            <>Complete Pre-Test</>
          )}

        {flowStatus.preTest &&
          !flowStatus.learning && (
            <>Learning Required</>
          )}

        {flowStatus.learning &&
          !flowStatus.postTest && (
            <>Post-Test Required</>
          )}

        {flowStatus.postTest &&
          !flowStatus.screening && (
            <>Screening Required</>
          )}

        {flowStatus.screening &&
          !flowStatus.simulator && (
            <>Explore Simulator</>
          )}

      </div>

    </nav>
  );
}

export default Navbar;