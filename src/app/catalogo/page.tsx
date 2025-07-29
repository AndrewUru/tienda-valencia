import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import ProductoCard from "@/components/ProductoCard";
import type { Producto } from "@/lib/firebase"; // si lo definiste ahí

export default async function CatalogoPage() {
  const snapshot = await getDocs(collection(db, "productos"));
  const productos: Producto[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Producto[];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Catálogo completo</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
