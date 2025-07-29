"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  bg: string;
  image: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      title: "Excelencia Deportiva",
      subtitle: "Equipamiento profesional de élite",
      description: "Tecnología avanzada para atletas que buscan la perfección",
      cta: "Explorar Colección",
      bg: "bg-gradient-to-br from-gray-900 via-black to-gray-800",
      image: "⚡",
    },
    {
      title: "Rendimiento Superior",
      subtitle: "Calidad premium garantizada",
      description:
        "Marcas líderes mundiales en equipamiento deportivo profesional",
      cta: "Ver Catálogo",
      bg: "bg-gradient-to-br from-slate-900 via-gray-900 to-black",
      image: "🎯",
    },
    {
      title: "Innovación Constante",
      subtitle: "Lo último en tecnología deportiva",
      description: "Productos diseñados para maximizar tu potencial atlético",
      cta: "Descubrir Más",
      bg: "bg-gradient-to-br from-black via-slate-800 to-gray-900",
      image: "🏆",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia de slide cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/nike-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          style={{ zIndex: 0 }}
          priority
        />

        {/* Capa oscura extra opcional */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight mb-4">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          {slides[currentSlide].subtitle}
        </p>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-400 mb-8">
          {slides[currentSlide].description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg">
            {slides[currentSlide].cta}
          </button>
          <button className="border border-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-transform hover:scale-105">
            Contactar
          </button>
        </div>
      </div>
    </section>
  );
}
