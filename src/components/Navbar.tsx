"use client";

import Link from "next/link";
import { Home, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo o Home */}
        <Link
          href="/"
          className="text-black dark:text-white hover:text-orange-500 transition-colors"
        >
          <Home className="w-6 h-6" />
        </Link>

        {/* Navegación principal */}
        <div className="flex items-center gap-6 text-black dark:text-white">
          <Link
            href="/buscar"
            className="hover:text-orange-500 transition-colors"
          >
            <Search className="w-6 h-6" />
          </Link>
          <Link
            href="/carrito"
            className="hover:text-orange-500 transition-colors relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <Link
            href="/cuenta"
            className="hover:text-orange-500 transition-colors"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
