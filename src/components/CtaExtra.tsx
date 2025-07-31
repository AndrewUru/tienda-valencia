//C:\tienda-valencia\src\components\Cta-extra

"use client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTAExtra() {
  return (
    <section className="bg-blue-500 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          ¿Tienes dudas o quieres hacer tu pedido?
        </h2>
        <p className="mb-8 text-lg">
          Escríbenos por WhatsApp y te ayudamos en el momento. Atención
          personalizada y rápida.
        </p>
        <Link
          href="https://wa.me/34600000000" // reemplaza con tu número real
          target="_blank"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Chatear por WhatsApp
        </Link>
      </div>
    </section>
  );
}
