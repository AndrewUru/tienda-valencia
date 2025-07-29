import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Producto } from "@/lib/firebase";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductoPage({ params }: Props) {
  const ref = doc(db, "productos", params.id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return <div className="p-6">Producto no encontrado.</div>;
  }

  const producto = { id: snapshot.id, ...snapshot.data() } as Producto;
  const mensaje = encodeURIComponent(
    `Hola, quiero pedir la ${producto.nombre}`
  );
  const enlaceWhatsApp = `https://wa.me/34624553034?text=${mensaje}`;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={600}
        height={400}
        className="w-full max-h-96 object-cover rounded mb-4"
      />

      <p className="text-lg text-gray-700 mb-2">{producto.descripcion}</p>
      <p className="text-md font-semibold mb-2">{producto.precio} €</p>

      {Array.isArray(producto.variantes) && producto.variantes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Talla:</label>
          <select className="border px-2 py-1 rounded w-full max-w-xs">
            {producto.variantes.map((talla) => (
              <option key={talla}>{talla}</option>
            ))}
          </select>
        </div>
      )}

      <a
        href={enlaceWhatsApp}
        target="_blank"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Pedir por WhatsApp
      </a>
    </main>
  );
}
