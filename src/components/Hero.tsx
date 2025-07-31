"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Instagram,
  Zap,
  Truck,
  Award,
} from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  bg: string;
  image: string;
  accent: string;
  badge?: string;
}

interface Feature {
  icon: React.ReactNode;
  text: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const slides: Slide[] = [
    {
      id: 1,
      title: "Estilo y Rendimiento",
      subtitle: "Tu ropa deportiva favorita, directo desde Instagram",
      description:
        "Distribuimos las mejores marcas de deporte en Valencia y toda Europa",
      cta: "Ver Productos",
      ctaLink: "/productos",
      bg: "bg-gradient-to-br from-blue-900 via-purple-900 to-black",
      image: "/slide-1.webp",
      accent: "from-blue-500 to-purple-600",
      badge: "Nuevo",
    },
    {
      id: 2,
      title: "Vístete para Ganar",
      subtitle: "Ropa y calzado para cada desafío",
      description:
        "Nuestra selección premium está pensada para tu día a día activo y competitivo",
      cta: "Explorar Colección",
      ctaLink: "/coleccion",
      bg: "bg-gradient-to-br from-orange-900 via-red-900 to-black",
      image: "/slide-3.webp",
      accent: "from-orange-500 to-red-600",
      badge: "Trending",
    },
    {
      id: 3,
      title: "Entrega Rápida",
      subtitle: "Haz tu pedido por DM",
      description:
        "Pide por Instagram y recíbelo en Valencia en 24h con seguimiento en tiempo real",
      cta: "Escríbenos",
      ctaLink: "https://instagram.com",
      bg: "bg-gradient-to-br from-green-900 via-teal-900 to-black",
      image: "/slide-2.webp",
      accent: "from-green-500 to-teal-600",
      badge: "24h",
    },
  ];

  const features: Feature[] = [
    { icon: <Instagram className="w-5 h-5" />, text: "Pedidos por DM" },
    { icon: <Truck className="w-5 h-5" />, text: "Entrega 24h Valencia" },
    { icon: <Award className="w-5 h-5" />, text: "Marcas Premium" },
    { icon: <Zap className="w-5 h-5" />, text: "Stock Actualizado" },
  ];

  const nextSlide = useCallback(() => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? "next" : "prev");
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-18">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-20" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-[6000ms] hover:scale-105"
                priority={index === 0}
                quality={90}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Animated Background Overlay */}
      <div
        className={`absolute inset-0 ${currentSlideData.bg} opacity-20 z-20`}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-25">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-30 h-full flex flex-col justify-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`space-y-8 transition-all duration-700 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 opacity-0"
              }`}
            >
              {/* Badge */}
              {currentSlideData.badge && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSlideData.accent} animate-pulse`}
                  />
                  <span className="text-sm font-semibold text-white">
                    {currentSlideData.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-4">
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-none transition-all duration-500 delay-200 ${
                    direction === "next"
                      ? "animate-slideInLeft"
                      : "animate-slideInRight"
                  }`}
                >
                  <span
                    className={`bg-gradient-to-r ${currentSlideData.accent} bg-clip-text text-transparent`}
                  >
                    {currentSlideData.title.split(" ")[0]}
                  </span>
                  <br />
                  <span className="text-white">
                    {currentSlideData.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-2xl transition-all duration-500 delay-300">
                  {currentSlideData.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed transition-all duration-500 delay-400">
                {currentSlideData.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 transition-all duration-500 delay-500">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${currentSlideData.accent} bg-opacity-20`}
                    >
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-600">
                <button
                  className={`group relative px-8 py-4 bg-gradient-to-r ${currentSlideData.accent} text-white font-bold uppercase tracking-wide rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">{currentSlideData.cta}</span>
                </button>

                <button className="px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wide rounded-xl hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Contactar
                </button>
              </div>
            </div>

            {/* Right Content - Slide Indicators & Stats */}
            <div
              className={`hidden lg:flex flex-col items-end space-y-8 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              {/* Stats */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-gray-400">Productos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24h</div>
                    <div className="text-sm text-gray-400">Entrega</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">3.5k</div>
                    <div className="text-sm text-gray-400">Seguidores</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? `w-8 bg-gradient-to-r ${currentSlideData.accent}`
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-2"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-40">
        <div
          className={`h-full bg-gradient-to-r ${currentSlideData.accent} transition-all duration-300`}
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
