// src/app/producto/[id]/page.tsx

import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Producto } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

// ✅ Tipado compatible con Next.js App Router
export default async function ProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const ref = doc(db, "productos", params.id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Producto no encontrado</h2>
          <Link href="/" className="text-blue-600 underline">
            <ArrowLeft className="inline w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const producto = { id: snapshot.id, ...snapshot.data() } as Producto;
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
}
