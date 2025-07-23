import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg text-xl font-bold transition-all duration-300 z-50 border-2 border-orange-500 hover:shadow-xl"
      aria-label="Back to Top"
      style={{
        minWidth: "220px",
        color: "#ea580c", // orange-600 text
      }}
    >
      <ChevronUp size={32} className="text-orange-600" />
      <span className="text-orange-600">Back to Top</span>
    </button>
  );
};

export default BackToTopButton;