import { getDestacados } from "@/lib/firebase";
import ProductoCard from "@/components/ProductoCard";
import Hero from "@/components/Hero";

export default async function HomePage() {
  const productos = await getDestacados();

  return (
    <>
      {/* Hero fuera del contenedor limitado */}
      <div className="w-screen max-w-none overflow-x-hidden">
        <Hero />
      </div>

      {/* Contenido con padding y ancho limitado */}
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Destacados</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </main>
    </>
  );
}
