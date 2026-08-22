import { useEffect, useRef, useState } from "react";
import "./IntroVideo.css";

export default function IntroVideo() {
  const videoRef = useRef(null);

  const [showIntro, setShowIntro] = useState(() => {
    return (
      sessionStorage.getItem("chromaware_intro_seen") !== "true"
    );
  });

  useEffect(() => {
    if (!showIntro) return;

    const video = videoRef.current;

    if (!video) return;

    const handleEnded = () => {
      sessionStorage.setItem(
        "chromaware_intro_seen",
        "true"
      );

      setShowIntro(false);
    };

    video.addEventListener("ended", handleEnded);

    video.play().catch((error) => {
      console.log("Video autoplay:", error);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [showIntro]);

  if (!showIntro) {
    return null;
  }

  return (
    <div className="intro-video">
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
      />
    </div>
  );
}