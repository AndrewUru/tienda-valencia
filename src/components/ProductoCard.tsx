"use client";

import Image from "next/image";

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  variantes?: string[];
  destacado?: boolean;
  activo?: boolean;
  marca?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
}

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-60">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
        <p className="text-sm text-gray-500">{producto.categoria}</p>
        <p className="mt-2 font-bold text-xl text-blue-600">
          €{producto.precio}
        </p>

        {producto.variantes && producto.variantes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {producto.variantes.map((variante) => (
              <span
                key={variante}
                className="bg-gray-100 px-2 py-1 rounded border"
              >
                {variante}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
