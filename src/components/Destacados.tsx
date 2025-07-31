"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  Search,
  Eye,
  Grid,
  List,
  Zap,
} from "lucide-react";

export type Producto = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  categoria?: string;
  destacado?: boolean;
  variantes?: string[];
  activo?: boolean;
  marca?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
};

interface ProductosSectionProps {
  productos: Producto[];
  loading?: boolean;
  error?: string;
}

export default function ProductosSection({
  productos,
  loading = false,
  error,
}: ProductosSectionProps) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [ordenamiento, setOrdenamiento] = useState("destacados");
  const [vistaGrid, setVistaGrid] = useState(true);
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [mostrarSoloDestacados, setMostrarSoloDestacados] = useState(false);

  // Filtrar solo productos activos
  const productosActivos = useMemo(() => {
    return productos.filter((p) => p.activo !== false);
  }, [productos]);

  const categorias = useMemo(() => {
    const cats = [
      ...new Set(productosActivos.map((p) => p.categoria).filter(Boolean)),
    ];
    return ["todos", ...cats];
  }, [productosActivos]);

  const productosFiltrados = useMemo(() => {
    let productosFiltro = [...productosActivos];

    // Filtro por destacados
    if (mostrarSoloDestacados) {
      productosFiltro = productosFiltro.filter((p) => p.destacado);
    }

    // Filtro por búsqueda
    if (busqueda.trim()) {
      const terminoBusqueda = busqueda.toLowerCase().trim();
      productosFiltro = productosFiltro.filter(
        (p) =>
          p.nombre.toLowerCase().includes(terminoBusqueda) ||
          p.marca?.toLowerCase().includes(terminoBusqueda) ||
          p.descripcion?.toLowerCase().includes(terminoBusqueda) ||
          p.categoria?.toLowerCase().includes(terminoBusqueda)
      );
    }

    // Filtro por categoría
    if (categoriaSeleccionada !== "todos") {
      productosFiltro = productosFiltro.filter(
        (p) => p.categoria === categoriaSeleccionada
      );
    }

    // Ordenamiento
    switch (ordenamiento) {
      case "precio-asc":
        productosFiltro.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        productosFiltro.sort((a, b) => b.precio - a.precio);
        break;
      case "rating":
        productosFiltro.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "nombre":
        productosFiltro.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "stock":
        productosFiltro.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      default: // destacados primero
        productosFiltro.sort((a, b) => {
          if (a.destacado && !b.destacado) return -1;
          if (!a.destacado && b.destacado) return 1;
          return b.precio - a.precio; // luego por precio descendente
        });
    }

    return productosFiltro;
  }, [
    productosActivos,
    busqueda,
    categoriaSeleccionada,
    ordenamiento,
    mostrarSoloDestacados,
  ]);

  const toggleFavorito = (id: string) => {
    const nuevosFavoritos = new Set(favoritos);
    if (nuevosFavoritos.has(id)) {
      nuevosFavoritos.delete(id);
    } else {
      nuevosFavoritos.add(id);
    }
    setFavoritos(nuevosFavoritos);
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  const renderRating = (rating?: number, reviews?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1 text-sm">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : i < rating
                  ? "text-yellow-400 fill-current opacity-50"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-400 ml-1 text-xs">
          {rating.toFixed(1)} {reviews && `(${reviews})`}
        </span>
      </div>
    );
  };

  const ProductCard = ({ producto }: { producto: Producto }) => {
    const sinStock = producto.stock === 0;
    const stockBajo =
      producto.stock !== undefined && producto.stock > 0 && producto.stock < 5;

    return (
      <div className="group relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500 overflow-hidden hover:-translate-y-1">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {producto.destacado && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Destacado
            </div>
          )}
          {stockBajo && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ¡Solo {producto.stock}!
            </div>
          )}
          {sinStock && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Agotado
            </div>
          )}
        </div>

        {/* Botón favorito */}
        <button
          onClick={() => toggleFavorito(producto.id)}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors border border-gray-600"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favoritos.has(producto.id)
                ? "text-red-500 fill-current"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Imagen */}
        <div className="relative overflow-hidden bg-gray-700 aspect-square">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Botones de acción al hover */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors border border-gray-600">
              <Eye className="w-4 h-4 text-gray-300" />
            </button>
            <button
              className={`p-2 rounded-full shadow-lg transition-colors border ${
                sinStock
                  ? "bg-gray-600 border-gray-500 cursor-not-allowed text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
              }`}
              disabled={sinStock}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Marca y categoría */}
          <div className="flex items-center justify-between mb-2">
            {producto.marca && (
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wide">
                {producto.marca}
              </span>
            )}
            {producto.categoria && (
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full border border-gray-600">
                {producto.categoria}
              </span>
            )}
          </div>

          {/* Nombre */}
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {producto.nombre}
          </h3>

          {/* Descripción */}
          {producto.descripcion && (
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {producto.descripcion}
            </p>
          )}

          {/* Rating */}
          {producto.rating && (
            <div className="mb-3">
              {renderRating(producto.rating, producto.reviews)}
            </div>
          )}

          {/* Variantes */}
          {producto.variantes && producto.variantes.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Variantes:</p>
              <div className="flex flex-wrap gap-1">
                {producto.variantes.slice(0, 2).map((variante, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full border border-gray-600"
                  >
                    {variante}
                  </span>
                ))}
                {producto.variantes.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{producto.variantes.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Precio y stock */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl font-bold text-blue-400">
              {formatearPrecio(producto.precio)}
            </div>
            {producto.stock !== undefined && (
              <div className="text-sm text-gray-500">
                Stock:{" "}
                <span
                  className={
                    producto.stock > 5
                      ? "text-green-400"
                      : producto.stock > 0
                      ? "text-orange-400"
                      : "text-red-400"
                  }
                >
                  {producto.stock}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="w-64 h-8 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
              >
                <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="w-1/3 h-8 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Error al cargar productos
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Nuestros <span className="text-blue-400">Productos</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra selección premium de tecnología y electrónicos
          </p>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "todos" ? "Todas las categorías" : cat}
                  </option>
                ))}
              </select>

              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
                <option value="nombre">Nombre A-Z</option>
                <option value="stock">Mayor Stock</option>
              </select>

              {/* Toggle destacados */}
              <button
                onClick={() => setMostrarSoloDestacados(!mostrarSoloDestacados)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors border ${
                  mostrarSoloDestacados
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <Zap className="w-4 h-4" />
                Solo destacados
              </button>

              {/* Toggle vista */}
              <div className="flex bg-gray-700 rounded-xl p-1 border border-gray-600">
                <button
                  onClick={() => setVistaGrid(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    vistaGrid ? "bg-gray-600 text-blue-400" : "text-gray-400"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setVistaGrid(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    !vistaGrid ? "bg-gray-600 text-blue-400" : "text-gray-400"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Mostrando {productosFiltrados.length} producto
            {productosFiltrados.length !== 1 ? "s" : ""}
            {busqueda && ` para "${busqueda}"`}
            {categoriaSeleccionada !== "todos" &&
              ` en ${categoriaSeleccionada}`}
            {mostrarSoloDestacados && " destacados"}
          </p>

          {(busqueda ||
            categoriaSeleccionada !== "todos" ||
            mostrarSoloDestacados) && (
            <button
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("todos");
                setMostrarSoloDestacados(false);
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Grid de productos */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-400 mb-4">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("todos");
                setMostrarSoloDestacados(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div
            className={
              vistaGrid
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
