import Hero from "@/components/Hero";
import Destacados from "@/components/Destacados";
import { getDestacados } from "@/lib/firebase"; // O tu función real

export default async function HomePage() {
  const productosFromDb = await getDestacados(); // Obtener los productos destacados
  // Asegurarse de que 'categoria' siempre sea string
  const productos = productosFromDb.map((producto) => ({
    ...producto,
    categoria: producto.categoria ?? "",
    descripcion: producto.descripcion ?? "",
    destacado: producto.destacado ?? false,
    variantes: producto.variantes ?? [],
    activo: producto.activo ?? false,
    marca: producto.marca ?? "",
    rating: producto.rating ?? 0,
    reviews: producto.reviews ?? 0,
    stock: producto.stock ?? 0,
  }));

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Productos destacados */}
      <Destacados productos={productos} />
    </>
  );
}
