"use client";
import Image from "next/image";
import Link from "next/link";

const categorias = [
  {
    nombre: "Ropa",
    imagen: "/categorias/ropa.jpg",
    enlace: "/categoria/ropa",
  },
  {
    nombre: "Calzado",
    imagen: "/categorias/calzado.jpg",
    enlace: "/categoria/calzado",
  },
  {
    nombre: "Accesorios",
    imagen: "/categorias/accesorios.jpg",
    enlace: "/categoria/accesorios",
  },
];

export default function Categorias() {
  return (
    <section className="bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">
          Explora por categorías
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categorias.map((cat, i) => (
            <Link
              key={i}
              href={cat.enlace}
              className="group block relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={cat.imagen}
                alt={cat.nombre}
                width={600}
                height={400}
                className="w-full h-64 object-cover opacity-90 group-hover:opacity-75 transition"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {cat.nombre}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
