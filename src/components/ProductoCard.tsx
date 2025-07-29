import Image from "next/image";
import Link from "next/link";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
};

export default function ProductoCard({ producto }: { producto: Producto }) {
  const mensaje = encodeURIComponent(`Hola, quiero pedir: ${producto.nombre}`);
  const enlaceWhatsApp = `https://wa.me/34624553034?text=${mensaje}`;

  return (
    <div className="border rounded-xl shadow-lg p-4 bg-white hover:shadow-2xl transition-shadow duration-300">
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={600}
        height={400}
        className="w-full max-h-96 object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-bold text-blue-900">{producto.nombre}</h2>
      <p className="text-md text-gray-700 font-semibold mb-4">
        {producto.precio.toFixed(2)} €
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Botón WhatsApp */}
        <a
          href={enlaceWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
        >
          Pedir por WhatsApp
        </a>

        {/* Botón a detalle del producto */}
        <Link
          href={`/producto/${producto.id}`}
          className="flex-1 text-center bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
