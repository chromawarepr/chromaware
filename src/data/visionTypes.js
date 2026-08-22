const visionTypes = [
  {
    category: "Red-Green Type",
    name: "Protanomaly",
    cone: "L Cone (Red)",
    level: "Mild",
    description:
      "A condition where the red cone pigment works differently. Red, orange, and yellow colors may appear less bright or slightly greenish.",
    impact:
      "Usually has little effect on daily activities.",
    color: "#B45309"
  },

  {
    category: "Red-Green Type",
    name: "Protanopia",
    cone: "L Cone (Red)",
    level: "Severe",
    description:
      "The red cone pigment does not function. Red colors may appear darker, and some red, orange, yellow, and green shades may look similar.",
    impact:
      "Can make identifying colors in charts, maps, and objects more difficult.",
    color: "#DC2626"
  },


  {
    category: "Red-Green Type",
    name: "Deuteranomaly",
    cone: "M Cone (Green)",
    level: "Mild",
    description:
      "The green cone pigment works differently. This is the most common type of color vision deficiency.",
    impact:
      "Green and yellow shades may appear different, but many people adapt easily.",
    color: "#16A34A"
  },


  {
    category: "Red-Green Type",
    name: "Deuteranopia",
    cone: "M Cone (Green)",
    level: "Severe",
    description:
      "The green cone pigment does not function. Red and green colors may become difficult to distinguish.",
    impact:
      "May affect interpreting color-coded information.",
    color: "#15803D"
  },


  {
    category: "Blue-Yellow Type",
    name: "Tritanomaly",
    cone: "S Cone (Blue)",
    level: "Mild",
    description:
      "The blue cone pigment has reduced function. Blue may appear greener and some colors may become harder to separate.",
    impact:
      "Rare but may affect recognizing blue-yellow combinations.",
    color: "#2563EB"
  },


  {
    category: "Blue-Yellow Type",
    name: "Tritanopia",
    cone: "S Cone (Blue)",
    level: "Severe",
    description:
      "The blue cone pigment does not function. Blue and yellow colors may appear different.",
    impact:
      "Can make some blue and yellow shades difficult to identify.",
    color: "#1D4ED8"
  },


  {
    category: "Full Color Loss",
    name: "Cone Monochromacy",
    cone: "Multiple Cone Cells",
    level: "Severe",
    description:
      "Two or more cone pigments do not function properly, causing very limited color perception.",
    impact:
      "Difficulty comparing and identifying colors.",
    color: "#64748B"
  },


  {
    category: "Full Color Loss",
    name: "Rod Monochromacy (Achromatopsia)",
    cone: "All Cone Cells",
    level: "Complete",
    description:
      "Cone cells do not provide color information. The world appears mostly black, white, and gray.",
    impact:
      "Bright environments may be uncomfortable and vision clarity may be affected.",
    color: "#334155"
  }
];


export default visionTypes;