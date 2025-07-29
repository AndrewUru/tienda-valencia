"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 w-full z-50 transition-all duration-500 ${
        isAtTop ? "bottom-0" : "top-0"
      } bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-bold hover:text-blue-200 transition-colors">
              SportZone Valencia
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {[
            ["Inicio", "/"],
            ["Fútbol", "/futbol"],
            ["Basketball", "/basketball"],
            ["Running", "/running"],
            ["Fitness", "/fitness"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="hover:text-blue-200 transition-colors border-b-2 border-transparent hover:border-blue-200 pb-1"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/ofertas"
              className="bg-red-600 px-3 py-1 rounded-full hover:bg-red-500 transition-colors"
            >
              Ofertas
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/buscar"
            className="hover:text-blue-200 transition-colors"
          >
            <span className="text-xl">🔍</span>
          </Link>
          <Link
            href="/carrito"
            className="hover:text-blue-200 transition-colors relative"
          >
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Link>
          <Link
            href="/cuenta"
            className="hover:text-blue-200 transition-colors"
          >
            <span className="text-xl">👤</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl">☰</button>
      </div>
    </nav>
  );
}
