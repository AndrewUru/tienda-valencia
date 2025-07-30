"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Heart,
  Star,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Zap,
  Award,
  TrendingUp,
  Eye,
} from "lucide-react";

// Definición de interfaces
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  precioOriginal?: number;
  imagen: string;
  categoria: string;
  marca: string;
  rating: number;
  reviews: number;
  descuento?: number;
  nuevo?: boolean;
  bestseller?: boolean;
  stock: number;
  colores?: string[];
  tallas?: string[];
}

interface DestacadosProps {
  productos: Producto[];
}

type FilterCategory = "todos" | "futbol" | "basketball" | "running" | "fitness";
type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";
type ViewMode = "grid" | "list";

// Datos de ejemplo para demostración
const productosEjemplo: Producto[] = [
  {
    id: "1",
    nombre: "Nike Air Max 270",
    precio: 159.99,
    precioOriginal: 199.99,
    imagen: "/nike-air-max.webp",
    categoria: "running",
    marca: "Nike",
    rating: 4.8,
    reviews: 234,
    descuento: 20,
    nuevo: true,
    stock: 15,
    colores: ["negro", "blanco", "azul"],
    tallas: ["39", "40", "41", "42", "43"],
  },
  {
    id: "2",
    nombre: "Adidas Ultraboost 23",
    precio: 179.99,
    imagen: "/api/placeholder/300/300",
    categoria: "running",
    marca: "Adidas",
    rating: 4.9,
    reviews: 189,
    bestseller: true,
    stock: 8,
    colores: ["negro", "gris"],
    tallas: ["38", "39", "40", "41", "42"],
  },
  {
    id: "3",
    nombre: "Jordan Retro 1 High",
    precio: 229.99,
    imagen: "/api/placeholder/300/300",
    categoria: "basketball",
    marca: "Jordan",
    rating: 4.7,
    reviews: 156,
    stock: 12,
    colores: ["rojo", "negro", "blanco"],
    tallas: ["40", "41", "42", "43", "44"],
  },
  {
    id: "4",
    nombre: "Puma Future Z 1.3",
    precio: 199.99,
    precioOriginal: 249.99,
    imagen: "/api/placeholder/300/300",
    categoria: "futbol",
    marca: "Puma",
    rating: 4.6,
    reviews: 92,
    descuento: 20,
    stock: 6,
    colores: ["azul", "amarillo"],
    tallas: ["39", "40", "41", "42"],
  },
  {
    id: "5",
    nombre: "Nike Metcon 9",
    precio: 129.99,
    imagen: "/nike-metcon.webp",
    categoria: "fitness",
    marca: "Nike",
    rating: 4.5,
    reviews: 78,
    nuevo: true,
    stock: 20,
    colores: ["negro", "rosa"],
    tallas: ["36", "37", "38", "39", "40"],
  },
  {
    id: "6",
    nombre: "Adidas Copa Mundial",
    precio: 149.99,
    imagen: "/adidas-copa.webp",
    categoria: "futbol",
    marca: "Adidas",
    rating: 4.9,
    reviews: 312,
    bestseller: true,
    stock: 25,
    colores: ["negro"],
    tallas: ["39", "40", "41", "42", "43", "44"],
  },
];

const ProductCard = ({
  producto,
  viewMode,
}: {
  producto: Producto;
  viewMode: ViewMode;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    producto.colores?.[0] || ""
  );

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (viewMode === "list") {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex gap-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="w-full h-full bg-gray-700 rounded-xl overflow-hidden">
              <span className="flex items-center justify-center h-full text-gray-400 text-sm">
                Imagen
              </span>
            </div>
            {producto.nuevo && (
              <span className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Nuevo
              </span>
            )}
            {producto.bestseller && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Top
              </span>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {producto.nombre}
              </h3>
              <p className="text-gray-400 text-sm">{producto.marca}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">
                  {producto.rating}
                </span>
                <span className="text-gray-400 text-sm">
                  ({producto.reviews})
                </span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-green-400 text-sm font-medium">
                {producto.stock} disponibles
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">
                  {formatPrice(producto.precio)}
                </span>
                {producto.precioOriginal && (
                  <span className="text-gray-400 line-through">
                    {formatPrice(producto.precioOriginal)}
                  </span>
                )}
                {producto.descuento && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    -{producto.descuento}%
                  </span>
                )}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-700 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Overlay with actions */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Eye className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-current" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {producto.nuevo && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Nuevo
            </span>
          )}
          {producto.bestseller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Bestseller
            </span>
          )}
          {producto.descuento && (
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              -{producto.descuento}%
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "text-red-500 fill-current" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {producto.nombre}
          </h3>
          <p className="text-gray-400 text-sm">{producto.marca}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(producto.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">({producto.reviews})</span>
        </div>

        {/* Colors */}
        {producto.colores && producto.colores.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Colores:</span>
            <div className="flex gap-1">
              {producto.colores.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? "border-white scale-110"
                      : "border-gray-600"
                  }`}
                  style={{
                    backgroundColor:
                      color === "negro"
                        ? "#000"
                        : color === "blanco"
                        ? "#fff"
                        : color === "azul"
                        ? "#3b82f6"
                        : color === "rojo"
                        ? "#ef4444"
                        : color === "gris"
                        ? "#6b7280"
                        : color === "rosa"
                        ? "#ec4899"
                        : color === "amarillo"
                        ? "#eab308"
                        : "#6b7280",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {formatPrice(producto.precio)}
              </span>
              {producto.precioOriginal && (
                <span className="text-gray-400 line-through text-sm">
                  {formatPrice(producto.precioOriginal)}
                </span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                producto.stock > 10
                  ? "text-green-400"
                  : producto.stock > 0
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {producto.stock > 0 ? `${producto.stock} disponibles` : "Agotado"}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={producto.stock === 0}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            producto.stock === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
          }`}
        >
          {producto.stock === 0 ? "Agotado" : "Añadir al Carrito"}
        </button>
      </div>
    </div>
  );
};

export default function Destacados({
  productos = productosEjemplo,
}: DestacadosProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("todos");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories: {
    key: FilterCategory;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "todos", label: "Todos", icon: <Grid className="w-4 h-4" /> },
    { key: "futbol", label: "Fútbol", icon: <Award className="w-4 h-4" /> },
    {
      key: "basketball",
      label: "Basketball",
      icon: <Award className="w-4 h-4" />,
    },
    { key: "running", label: "Running", icon: <Zap className="w-4 h-4" /> },
    {
      key: "fitness",
      label: "Fitness",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: "featured", label: "Destacados" },
    { key: "price-low", label: "Precio: Bajo a Alto" },
    { key: "price-high", label: "Precio: Alto a Bajo" },
    { key: "rating", label: "Mejor Valorados" },
    { key: "newest", label: "Más Recientes" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productos.filter(
      (producto) =>
        selectedCategory === "todos" || producto.categoria === selectedCategory
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.precio - b.precio);
        break;
      case "price-high":
        filtered.sort((a, b) => b.precio - a.precio);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0));
        break;
      default:
        filtered.sort(
          (a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
        );
    }

    return filtered;
  }, [productos, selectedCategory, sortBy]);

  if (!productos || productos.length === 0) return null;

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Productos{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Destacados
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Descubre nuestra selección premium de productos deportivos de las
          mejores marcas
        </p>
      </div>

      {/* Filters and Controls */}
      <div
        className={`mb-8 transition-all duration-700 delay-200 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div
        className={`transition-all duration-700 delay-400 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((producto, index) => (
              <div
                key={producto.id}
                className="transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard producto={producto} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedProducts.map((producto, index) => (
              <div
                key={producto.id}
                className="transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard producto={producto} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
            Ver Más Productos
          </button>
        </div>
      )}
    </section>
  );
}
