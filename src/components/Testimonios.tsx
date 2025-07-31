"use client";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Verified,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonios = [
  {
    nombre: "Lucía García",
    ubicacion: "Valencia, España",
    comentario:
      "Los productos llegaron rapidísimo y en perfectas condiciones. La atención al cliente es excepcional y el seguimiento del pedido fue perfecto. ¡Repetiré seguro!",
    imagen:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: "iPhone 15 Pro",
    fecha: "Hace 2 días",
    verificado: true,
  },
  {
    nombre: "Carlos Martínez",
    ubicacion: "Madrid, España",
    comentario:
      "Muy buena atención por WhatsApp, me ayudaron con todas mis dudas antes de comprar. El proceso fue súper fácil y transparente. Totalmente recomendable.",
    imagen:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: "MacBook Air M3",
    fecha: "Hace 5 días",
    verificado: true,
  },
  {
    nombre: "Marta Sánchez",
    ubicacion: "Barcelona, España",
    comentario:
      "Me encantó la calidad del producto. ¡Tal cual la foto! La entrega fue súper rápida y el empaquetado impecable. Muy recomendable esta tienda.",
    imagen:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: 'iPad Pro 12.9"',
    fecha: "Hace 1 semana",
    verificado: true,
  },
  {
    nombre: "Javier López",
    ubicacion: "Sevilla, España",
    comentario:
      "Excelente servicio y productos de primera calidad. La garantía que ofrecen te da mucha tranquilidad. Sin duda la mejor tienda online donde he comprado.",
    imagen:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: "Samsung Galaxy S24",
    fecha: "Hace 3 días",
    verificado: true,
  },
  {
    nombre: "Ana Rodríguez",
    ubicacion: "Bilbao, España",
    comentario:
      "Increíble experiencia de compra. Desde el primer contacto hasta la entrega, todo perfecto. Los precios son muy competitivos y la calidad excelente.",
    imagen:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: "Sony WH-1000XM5",
    fecha: "Hace 4 días",
    verificado: true,
  },
  {
    nombre: "David Fernández",
    ubicacion: "Zaragoza, España",
    comentario:
      "Me sorprendió la rapidez del envío y lo bien empaquetado que llegó todo. El seguimiento en tiempo real es genial. Definitivamente volveré a comprar aquí.",
    imagen:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    estrellas: 5,
    producto: "Dell XPS 13",
    fecha: "Hace 6 días",
    verificado: true,
  },
];

const estadisticasTestimonios = [
  { numero: "4.9", etiqueta: "Valoración media", sufijo: "/5" },
  { numero: "12k+", etiqueta: "Reseñas positivas", sufijo: "" },
  { numero: "98%", etiqueta: "Recomiendan", sufijo: "" },
  { numero: "24h", etiqueta: "Tiempo respuesta", sufijo: "" },
];

export default function Testimonios() {
  const [testimonioActual, setTestimonioActual] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play del carrusel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setTestimonioActual((prev) =>
        prev === testimonios.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const siguienteTestimonio = () => {
    setTestimonioActual((prev) =>
      prev === testimonios.length - 1 ? 0 : prev + 1
    );
  };

  const testimonioAnterior = () => {
    setTestimonioActual((prev) =>
      prev === 0 ? testimonios.length - 1 : prev - 1
    );
  };

  const renderEstrellas = (cantidad: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < cantidad ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative  py-20 px-6 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-500/20">
            <Star className="w-4 h-4 fill-current" />
            Testimonios verificados
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              clientes
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Miles de clientes satisfechos nos avalan. Descubre por qué confían
            en nosotros para sus compras de tecnología.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {estadisticasTestimonios.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-yellow-500/30 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                  {stat.numero}
                  <span className="text-2xl">{stat.sufijo}</span>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.etiqueta}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonio destacado principal */}
        <div className="mb-16">
          <div
            className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-yellow-400/20">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative">
              {/* Testimonio */}
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed italic mb-6">
                  &quot;{testimonios[testimonioActual].comentario}&quot;
                </p>
                {renderEstrellas(testimonios[testimonioActual].estrellas)}
              </div>

              {/* Autor */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonios[testimonioActual].imagen}
                    alt={testimonios[testimonioActual].nombre}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-yellow-400/20"
                  />
                  {testimonios[testimonioActual].verificado && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Verified className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white">
                    {testimonios[testimonioActual].nombre}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonios[testimonioActual].ubicacion}
                  </p>
                  <p className="text-blue-400 text-sm font-medium">
                    Compró: {testimonios[testimonioActual].producto}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {testimonios[testimonioActual].fecha}
                  </p>
                </div>
              </div>
            </div>

            {/* Controles del carrusel */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={testimonioAnterior}
                className="pointer-events-auto bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white p-3 rounded-full transition-colors border border-gray-600 hover:border-gray-500"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={siguienteTestimonio}
                className="pointer-events-auto bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white p-3 rounded-full transition-colors border border-gray-600 hover:border-gray-500"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonioActual(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonioActual
                      ? "bg-yellow-400 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid de testimonios adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonios.slice(0, 6).map((testimonio, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Header del testimonio */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={testimonio.imagen}
                    alt={testimonio.nombre}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  {testimonio.verificado && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Verified className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white text-sm truncate">
                      {testimonio.nombre}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-400 fill-current opacity-70" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">
                    {testimonio.ubicacion} • {testimonio.fecha}
                  </p>
                  {renderEstrellas(testimonio.estrellas)}
                </div>
              </div>

              {/* Comentario */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                &quot;{testimonio.comentario}&quot;
              </p>

              {/* Producto comprado */}
              <div className="text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-block border border-blue-500/20">
                Compró: {testimonio.producto}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Quieres ser el próximo cliente satisfecho?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Únete a miles de clientes que ya confían en nosotros. ¡Tu opinión
              podría ser la próxima en aparecer aquí!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/25">
                Ver productos
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-800/50">
                Leer más reseñas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS para line-clamp */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
