import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import IntroVideo from "./components/IntroVideo";
import UserGuide from "./components/UserGuide";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Test from "./pages/Test";
import IshiharaTest from "./pages/IshiharaTest";
import Simulator from "./pages/Simulator";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      {/* Opening Intro */}
      <IntroVideo />

      {/* User Guide */}
      <UserGuide />

      <ScrollToTop />

      <Navbar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/ishihara-test" element={<IshiharaTest />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;