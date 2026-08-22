const questions = [
  // =========================================================
  // I. UNDERSTANDING COLOR VISION DEFICIENCY
  // =========================================================

  {
    id: 1,
    question: "What is Color Vision Deficiency (CVD)?",
    options: [
      "A. A condition where a person cannot see anything at all",
      "B. A condition where a person has difficulty distinguishing certain colors",
      "C. A condition that only affects elderly people",
      "D. A condition that makes everything look black and white"
    ],
    answer: 1
  },

  {
    id: 2,
    question: "Which of the following is TRUE about Color Vision Deficiency?",
    options: [
      "A. Most people with CVD see the world only in black and white",
      "B. CVD always develops later in life due to aging",
      "C. CVD affects how a person perceives certain colors",
      "D. CVD only affects females"
    ],
    answer: 2
  },

  {
    id: 3,
    question: "How is the most common type of CVD inherited?",
    options: [
      "A. Through genes on the Y chromosome",
      "B. Through genes on the X chromosome",
      "C. Through exposure to sunlight",
      "D. Through eating certain foods"
    ],
    answer: 1
  },

  {
    id: 4,
    question: "Which statement about CVD is CORRECT?",
    options: [
      "A. CVD is a disease that can be cured with medicine",
      "B. Many people with CVD are unaware of their condition",
      "C. CVD only affects children",
      "D. CVD always causes complete loss of color vision"
    ],
    answer: 1
  },

  // =========================================================
  // II. HOW HUMANS SEE COLOR
  // =========================================================

  {
    id: 5,
    question: "What are the three types of cone cells in the human eye?",
    options: [
      "A. L-cone, M-cone, and S-cone",
      "B. Red cone, Blue cone, and Green cone",
      "C. Rod, Cone, and Lens",
      "D. Small, Medium, and Large cones"
    ],
    answer: 0
  },

  {
    id: 6,
    question: "What is the function of cone cells in the eye?",
    options: [
      "A. They help us see in the dark",
      "B. They detect different wavelengths of light for color vision",
      "C. They protect the eye from dust",
      "D. They help us see objects far away"
    ],
    answer: 1
  },

  {
    id: 7,
    question: "The S-cone is most sensitive to which type of light?",
    options: [
      "A. Long wavelengths (red-orange)",
      "B. Medium wavelengths (green)",
      "C. Short wavelengths (blue-violet)",
      "D. Infrared light"
    ],
    answer: 2
  },

  // =========================================================
  // III. TYPES OF CVD
  // =========================================================

  {
    id: 8,
    question: "What is the MOST COMMON type of Color Vision Deficiency?",
    options: [
      "A. Tritanopia (blue-blind)",
      "B. Protanopia (red-blind)",
      "C. Deuteranomaly (green-weak)",
      "D. Monochromacy (complete color loss)"
    ],
    answer: 2
  },

  {
    id: 9,
    question: "Which type of CVD affects the L-cone (red) and makes red colors appear darker?",
    options: [
      "A. Deuteranomaly",
      "B. Protanopia",
      "C. Tritanopia",
      "D. Achromatopsia"
    ],
    answer: 1
  },

  {
    id: 10,
    question: "Which type of CVD is characterized by difficulty distinguishing blue from green and yellow from red?",
    options: [
      "A. Red-green CVD",
      "B. Blue-yellow CVD",
      "C. Complete CVD",
      "D. Protanomaly"
    ],
    answer: 1
  },

  {
    id: 11,
    question: "What is the most severe form of CVD where a person sees only black, white, and gray?",
    options: [
      "A. Deuteranomaly",
      "B. Protanopia",
      "C. Tritanopia",
      "D. Achromatopsia (Rod Monochromacy)"
    ],
    answer: 3
  },

  {
    id: 12,
    question: "What does Deuteranomaly affect?",
    options: [
      "A. The S-cone (blue)",
      "B. The M-cone (green)",
      "C. The L-cone (red)",
      "D. All cone cells"
    ],
    answer: 1
  },

  // =========================================================
  // IV. CAUSES
  // =========================================================

  {
    id: 13,
    question: "Which of the following is an ACQUIRED cause of CVD?",
    options: [
      "A. Inherited genes from parents",
      "B. Eye diseases like glaucoma",
      "C. Having blue eyes",
      "D. Being born prematurely"
    ],
    answer: 1
  },

  {
    id: 14,
    question: "Why is red-green CVD more common in males than females?",
    options: [
      "A. Males have two X chromosomes",
      "B. Males have only one X chromosome",
      "C. Males have a different eye structure",
      "D. Males are more exposed to sunlight"
    ],
    answer: 1
  },

  // =========================================================
  // V. HOW COMMON IS CVD
  // =========================================================

  {
    id: 15,
    question: "Based on recent research, approximately what percentage of children and adolescents worldwide have CVD?",
    options: [
      "A. 0.5%",
      "B. 2.59%",
      "C. 10%",
      "D. 25%"
    ],
    answer: 1
  },

  {
    id: 16,
    question: "Which group has the highest prevalence of CVD?",
    options: [
      "A. Females",
      "B. Males",
      "C. Both males and females equally",
      "D. Children under 5 years old"
    ],
    answer: 1
  },

  // =========================================================
  // VI. TESTING
  // =========================================================

  {
    id: 17,
    question: "What is the name of the most common color vision test?",
    options: [
      "A. The Snellen Test",
      "B. The Ishihara Test",
      "C. The Glaucoma Test",
      "D. The Contrast Test"
    ],
    answer: 1
  },

  {
    id: 18,
    question: "What does the Ishihara Test use to check for color vision deficiency?",
    options: [
      "A. Letters of different sizes",
      "B. Colored dots arranged in patterns",
      "C. Flashing lights",
      "D. Moving objects"
    ],
    answer: 1
  },

  // =========================================================
  // VII. CVD AND LEARNING
  // =========================================================

  {
    id: 19,
    question: "Why can color-dependent instructional materials be challenging for students with CVD?",
    options: [
      "A. They cannot read at all",
      "B. They may have difficulty interpreting information that relies only on color",
      "C. They are unable to use computers",
      "D. They cannot see any colors"
    ],
    answer: 1
  },

  {
    id: 20,
    question: "What is a good strategy for teachers to make learning materials more accessible to students with CVD?",
    options: [
      "A. Use only red and green colors",
      "B. Combine color with labels, symbols, or text",
      "C. Avoid using any colors in materials",
      "D. Make all materials black and white"
    ],
    answer: 1
  }
];

export default questions;