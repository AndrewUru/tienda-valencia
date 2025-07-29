import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Moda en Valencia
      </Link>
      <ul className="flex gap-4 text-sm">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/catalogo">Catálogo</Link>
        </li>
      </ul>
    </nav>
  );
}
