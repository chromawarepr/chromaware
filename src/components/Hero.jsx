import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
            <BookOpen size={18} />
            Interactive Educational Website
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800">
            Understanding
            <span className="text-blue-600"> Color Vision Deficiency </span>
            Starts Here
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            ChromAware helps students learn about Color Vision Deficiency (CVD)
            through engaging educational content, awareness activities, and
            accessible design principles.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/learn"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/test"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl transition"
            >
              Awareness Test
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="ChromAware Hero"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;