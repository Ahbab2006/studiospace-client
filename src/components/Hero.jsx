
"use client";

import { useState } from "react";

const slides = [
  {
    title: "Find Your Perfect Creative Space",
    description:
      "Discover professional studios for photography, filmmaking, podcasts and more.",
    button: "Explore Studios",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    title: "Create Something Amazing",
    description:
      "Find inspiring spaces and bring your creative ideas to life.",
    button: "Discover Spaces",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  },
  {
    title: "Share Your Studio With Creators",
    description:
      "List your workspace and connect with creative professionals.",
    button: "Become a Host",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section
      className="relative flex min-h-[550px] items-center bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${slide.image})`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24 text-white">
        <div className="max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
            Welcome to StudioSpace
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            {slide.title}
          </h1>

          <p className="mb-8 max-w-xl text-lg text-gray-200">
            {slide.description}
          </p>

          <a
            href={
              currentSlide === 2 ? "/add-studio" : "/studios"
            }
            className="inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {slide.button}
          </a>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/40"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/40"
      >
        ❯
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all ${
              currentSlide === index
                ? "w-9 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
