function Types() {
  const types = [
    {
      icon: "🔴",
      title: "Protanopia",
      description:
        "Difficulty distinguishing red colors. Reds may appear darker or be confused with green."
    },
    {
      icon: "🟢",
      title: "Deuteranopia",
      description:
        "The most common type of CVD. People have difficulty distinguishing red and green."
    },
    {
      icon: "🔵",
      title: "Tritanopia",
      description:
        "A rare type of Color Vision Deficiency affecting blue and yellow color perception."
    },
    {
      icon: "⚫",
      title: "Achromatopsia",
      description:
        "A very rare condition where vision is mostly in shades of black, white, and gray."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
          Types of Color Vision Deficiency
        </h2>

        <p className="text-center text-slate-600 mb-12">
          Learn about the different types of CVD and how they affect color perception.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {types.map((type) => (
            <div
              key={type.title}
              className="bg-slate-50 rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-5">
                {type.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {type.title}
              </h3>

              <p className="text-slate-600">
                {type.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Types;