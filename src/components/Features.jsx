import { BookOpen, Eye, Palette } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <BookOpen size={42} className="text-blue-600" />,
      title: "Interactive Learning",
      description:
        "Explore easy-to-understand lessons about Color Vision Deficiency through engaging educational content.",
    },
    {
      icon: <Eye size={42} className="text-blue-600" />,
      title: "Awareness Activities",
      description:
        "Participate in interactive color vision awareness activities to better understand different types of CVD.",
    },
    {
      icon: <Palette size={42} className="text-blue-600" />,
      title: "Accessible Design",
      description:
        "Learn how to create educational materials that are more accessible and color-friendly.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800">
            Why Choose ChromAware?
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            ChromAware combines education, awareness, and accessibility into one
            interactive learning platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;