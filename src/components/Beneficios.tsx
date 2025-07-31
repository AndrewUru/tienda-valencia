"use client";
import {
  Truck,
  ShieldCheck,
  Zap,
  Clock,
  Award,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Headphones,
} from "lucide-react";

const beneficios = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Envíos rápidos",
    description: "Recibe tu pedido en 24/48h en toda España.",
    details: [
      "Envío gratis > 50€",
      "Seguimiento en tiempo real",
      "Devoluciones gratuitas",
    ],
    color: "from-blue-500 to-cyan-500",
    delay: "0ms",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Compra segura",
    description: "Pagos protegidos y garantía en todos nuestros productos.",
    details: ["SSL 256 bits", "Garantía 2 años", "Pagos seguros"],
    color: "from-green-500 to-emerald-500",
    delay: "100ms",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Atención directa",
    description: "Resolvemos tus dudas por WhatsApp en minutos.",
    details: ["Soporte 24/7", "Respuesta < 5 min", "Expertos técnicos"],
    color: "from-purple-500 to-pink-500",
    delay: "200ms",
  },
];

const estadisticas = [
  {
    number: "50k+",
    label: "Clientes satisfechos",
    icon: <Star className="w-5 h-5" />,
  },
  {
    number: "98%",
    label: "Entregas a tiempo",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    number: "4.9/5",
    label: "Valoración media",
    icon: <Award className="w-5 h-5" />,
  },
  {
    number: "24/7",
    label: "Soporte disponible",
    icon: <MessageCircle className="w-5 h-5" />,
  },
];

export default function Beneficios() {
  return (
    <section className="relative bg-gray-900 py-20 px-6 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/20">
            <CheckCircle className="w-4 h-4" />
            Garantía de calidad
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Por qué comprar con{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              nosotros?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Más de 50,000 clientes confían en nosotros. Descubre por qué somos
            la mejor opción para tus compras de tecnología.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {estadisticas.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-center mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Beneficios principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {beneficios.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{
                animationDelay: item.delay,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              {/* Gradiente de fondo animado */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} rounded-3xl transition-opacity duration-500`}
              ></div>

              {/* Icono con gradiente */}
              <div className="relative mb-6">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
                {/* Efecto de brillo */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                ></div>
              </div>

              {/* Contenido */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Lista de detalles */}
                <ul className="space-y-3 mb-6">
                  {item.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Botón sutil */}
                <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-medium">Saber más</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Efecto de borde animado */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-20 blur-sm`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para hacer tu pedido?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos y descubre la mejor
              experiencia de compra online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-800/50 flex items-center gap-2">
                Ver catálogo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group:hover .absolute.inset-0.rounded-3xl.bg-gradient-to-r {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}
