/* eslint-disable @typescript-eslint/no-explicit-any */

import { productos } from "@/lib/productos-json";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

const ProductoPage = ({ params }: { params: any }) => {
  const producto = productos.find((p) => p.id === params.id);

  if (!producto) return notFound();

  const mensaje = encodeURIComponent(
    `Hola, quiero información sobre ${producto.nombre}`
  );
  const enlaceWhatsApp = `https://wa.me/34624553034?text=${mensaje}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:underline flex items-center mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver
      </Link>

      <div className="bg-white rounded-xl shadow p-4">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={600}
          height={600}
          className="rounded-xl object-cover w-full"
        />
        <h1 className="text-2xl font-bold mt-4">{producto.nombre}</h1>
        <p className="text-xl text-green-600 font-semibold mt-2">
          {producto.precio}€
        </p>
        <p className="mt-4 text-gray-700">{producto.descripcion}</p>

        <a
          href={enlaceWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg transition"
        >
          <MessageCircle className="inline w-5 h-5 mr-2" />
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductoPage;