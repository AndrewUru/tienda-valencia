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
    <div className="border rounded shadow p-4 bg-white">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="mt-2 font-bold">{producto.nombre}</h2>
      <p className="text-sm text-gray-600">{producto.precio} €</p>
      <a
        href={enlaceWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        Pedir por WhatsApp
      </a>
    </div>
  );
}
