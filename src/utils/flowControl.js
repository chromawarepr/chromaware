/* =========================================================
   CHROMAWARE LEARNING FLOW CONTROLLER
========================================================= */

export const FLOW_KEYS = {
  AWARENESS: "chromaware_awareness_unlocked",
  PRETEST: "chromaware_pretest_completed",
  LEARNING: "chromaware_learning_completed",
  POSTTEST: "chromaware_posttest_completed",
  SCREENING: "chromaware_screening_completed",
  SIMULATOR: "chromaware_simulator_completed",
};

/* =========================================================
   UPDATE FLOW
========================================================= */

const updateFlow = () => {
  window.dispatchEvent(
    new Event("chromaware-flow-updated")
  );
};

/* =========================================================
   GET FLOW STATUS
========================================================= */

export const getFlowStatus = () => {
  return {
    awarenessUnlocked:
      localStorage.getItem(FLOW_KEYS.AWARENESS) === "true",

    preTest:
      localStorage.getItem(FLOW_KEYS.PRETEST) === "true",

    learning:
      localStorage.getItem(FLOW_KEYS.LEARNING) === "true",

    postTest:
      localStorage.getItem(FLOW_KEYS.POSTTEST) === "true",

    screening:
      localStorage.getItem(FLOW_KEYS.SCREENING) === "true",

    simulator:
      localStorage.getItem(FLOW_KEYS.SIMULATOR) === "true",
  };
};

/* =========================================================
   PAGE ACCESS

   IMPORTANT:
   ONCE A STEP IS COMPLETED, IT STAYS UNLOCKED.
========================================================= */

export const canAccess = (page) => {
  const status = getFlowStatus();

  switch (page) {
    case "home":
    case "about":
    case "contact":
      return true;

    case "awareness":
      return status.awarenessUnlocked;

    case "learn":
      return status.preTest;

    case "ishihara":
      return status.postTest;

    case "simulator":
      return status.screening;

    default:
      return false;
  }
};

/* =========================================================
   START AWARENESS TEST
========================================================= */

export const startAwarenessTest = () => {
  localStorage.setItem(
    FLOW_KEYS.AWARENESS,
    "true"
  );

  updateFlow();
};

/* =========================================================
   COMPLETE FLOW STEP
========================================================= */

export const completeFlowStep = (step) => {
  const key = FLOW_KEYS[step];

  if (!key) {
    console.error(
      "Invalid flow step:",
      step
    );
    return;
  }

  localStorage.setItem(key, "true");

  console.log(
    "FLOW STEP COMPLETED:",
    step,
    key
  );

  updateFlow();
};

/* =========================================================
   RESET FLOW
========================================================= */

export const resetFlow = () => {
  Object.values(FLOW_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });

  updateFlow();
};