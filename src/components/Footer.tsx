"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo y contacto */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Tienda Valencia
          </h2>
          <p className="mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" /> contacto@tiendavalencia.com
          </p>
          <p className="mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" /> +34 600 000 000
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/categoria/ropa" className="hover:text-white">
                Ropa
              </Link>
            </li>
            <li>
              <Link href="/categoria/calzado" className="hover:text-white">
                Calzado
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Legales */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/aviso-legal" className="hover:text-white">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="hover:text-white">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <Link href="https://instagram.com/tu_usuario" target="_blank">
              <Instagram className="w-6 h-6 hover:text-white" />
            </Link>
            <Link href="https://facebook.com/tu_usuario" target="_blank">
              <Facebook className="w-6 h-6 hover:text-white" />
            </Link>
            <Link href="https://twitter.com/tu_usuario" target="_blank">
              <Twitter className="w-6 h-6 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Tienda Valencia. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
