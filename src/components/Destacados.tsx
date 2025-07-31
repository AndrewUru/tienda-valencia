"use client";

import Image from "next/image";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  marca: string;
}

interface DestacadosProps {
  productos: Producto[];
}

export default function Destacados({ productos }: DestacadosProps) {
  if (!productos || productos.length === 0) {
    return (
      <section className="px-6 py-16 max-w-5xl mx-auto text-center text-gray-400">
        No hay productos destacados disponibles.
      </section>
    );
  }

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Productos <span className="text-blue-400">Destacados</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition"
          >
            <div className="relative w-full aspect-square mb-4 bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {producto.nombre}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{producto.marca}</p>
            <p className="text-blue-400 font-bold text-xl">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(producto.precio)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
