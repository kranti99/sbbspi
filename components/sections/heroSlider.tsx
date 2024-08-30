"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/components/elements/LanguageContext"; // Make sure the path is correct

interface Slide {
  _id: string;
  title: {
    en: string;
    ne: string;
  };
  imageUrl: string;
  link?: string;
}

const CarouselComponent: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const data: Slide[] = await client.fetch(`
        *[_type == "carousel"] | order(_createdAt desc) {
          _id,
          title {
            en,
            ne
          },
          "imageUrl": image.asset->url,
          link
        }
      `);
      setSlides(data);
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: (
      <button
        className="slick-arrow slick-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary-800 text-white px-4 py-2 rounded-full shadow-xl hover:bg-primary-700 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100 z-30"
        style={{
          zIndex: "30 !important",
          right: "16px !important",
          left: "auto !important",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    ),
    prevArrow: (
      <button
        className="slick-arrow slick-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary-800 text-white px-4 py-2 rounded-full shadow-xl hover:bg-primary-700 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100 z-30"
        style={{
          zIndex: "30 !important",
          left: "16px !important",
          right: "auto !important",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{ bottom: "-30px" }}
        className="absolute w-full flex justify-center"
      >
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className="w-4 h-4 bg-primary-800 rounded-full focus:outline-none"
      />
    ),
  };

  return (
    <div className="homeSlider relative w-full mx-auto overflow-hidden mt-6 mb-6 pb-3 bg-white shadow-xl rounded-lg">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide._id} className="relative">
            <img
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <p className="absolute bottom-0 left-0 w-full p-4 text-center text-lg text-white bg-gray-900 bg-opacity-50 rounded-b-lg">
              {slide.title?.[language] || ""} {/* Display title based on selected language */}
            </p>
            {slide.link && (
              <a
                href={slide.link}
                className="absolute top-0 left-0 w-full h-full"
                aria-label="Slide Link"
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
