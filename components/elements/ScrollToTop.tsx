"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isVisible ? 'block' : 'hidden'}`}>
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faArrowUp} className="text-green-600 hover:text-white" />
      </button>
    </div>
  );
}
