import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Producto } from "@/lib/firebase";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductoPage({ params }: Props) {
  const ref = doc(db, "productos", params.id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a productos
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative group">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  priority
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {producto.nombre}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 127 reseñas
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {producto.precio}€
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {(parseFloat(String(producto.precio)) * 1.2).toFixed(2)}€
                  </span>
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -17%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Precio especial por tiempo limitado
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {producto.descripcion}
                </p>
              </div>

              {/* Variants */}
              {Array.isArray(producto.variantes) &&
                producto.variantes.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-lg font-semibold text-gray-900 block">
                      Selecciona tu talla:
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {producto.variantes.map((talla, index) => (
                        <label key={talla} className="relative">
                          <input
                            type="radio"
                            name="talla"
                            value={talla}
                            defaultChecked={index === 0}
                            className="sr-only peer"
                          />
                          <div className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200">
                            <span className="font-medium text-gray-900">
                              {talla}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">
                    Envío gratis
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-800">
                    Garantía 30 días
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 pt-4">
                <a
                  href={enlaceWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Pedir por WhatsApp
                </a>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg">
                  <Heart className="w-5 h-5" />
                  Añadir a favoritos
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-gray-900">
                  Información adicional:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Entrega en 24-48 horas</li>
                  <li>• Atención al cliente personalizada</li>
                  <li>• Pago seguro por WhatsApp</li>
                  <li>• Satisfacción garantizada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Productos relacionados
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Próximamente mostraremos productos relacionados</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
