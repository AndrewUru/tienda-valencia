import { getDestacados } from "@/lib/firebase";
import ProductoCard from "@/components/ProductoCard";

export default async function HomePage() {
  const productos = await getDestacados();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Destacados</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
