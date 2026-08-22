function Statistics() {
  const stats = [
    {
      number: "300M+",
      title: "People Worldwide",
      description: "Estimated number of people living with Color Vision Deficiency."
    },
    {
      number: "8%",
      title: "Male Population",
      description: "Approximately 8% of males have some form of CVD."
    },
    {
      number: "0.5%",
      title: "Female Population",
      description: "Approximately 0.5% of females have CVD."
    }
  ];

  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
          Color Vision Deficiency in Numbers
        </h2>

        <p className="text-center text-slate-600 mb-12">
          Understanding the global impact of Color Vision Deficiency.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition duration-300"
            >
              <h3 className="text-5xl font-bold text-blue-600 mb-4">
                {item.number}
              </h3>

              <h4 className="text-xl font-semibold mb-3">
                {item.title}
              </h4>

              <p className="text-slate-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Statistics;