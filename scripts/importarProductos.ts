// scripts/importarProductos.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// ⚠️ Usa tu propia configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGEgaCK0Zo2qC1eeFhYehusgvJssib0Z4",
  authDomain: "tienda-valencia.firebaseapp.com",
  projectId: "tienda-valencia",
  storageBucket: "tienda-valencia.appspot.com",
  messagingSenderId: "624553034",
  appId: "1:624553034:web:5c5c5c5c5c5c5c5c5c5c5c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simula productos a importar
const productos = [
  {
    id: "camiseta-argentina-2024",
    nombre: "Camiseta Argentina 2024",
    descripcion: "Edición especial Copa América, tela dry-fit.",
    precio: 35,
    categoria: "Ropa",
    imagen:
      "https://elsaltoweb.es/wp-content/uploads/2025/07/camiseta-argentina-2024.webp",
    variantes: ["S", "M", "L", "XL"],
    destacado: true,
    activo: true,
  },
  {
    id: "jersey-valencia",
    nombre: "Jersey Valencia",
    descripcion: "Modelo local 23/24.",
    precio: 40,
    categoria: "Ropa",
    imagen:
      "https://elsaltoweb.es/wp-content/uploads/2025/07/camiseta-valencia-2025.webp",
    variantes: ["M", "L", "XL"],
    destacado: true,
    activo: true,
  },

  {
    id: "camiseta-basica-blanca",
    nombre: "Camiseta Básica Blanca",
    descripcion: "Algodón suave, corte clásico unisex.",
    precio: 18,
    categoria: "Ropa",
    imagen:
      "https://images.pexels.com/photos/1002644/pexels-photo-1002644.jpeg",
    variantes: ["S", "M", "L", "XL"],
    destacado: false,
    activo: true,
  },
  {
    id: "camiseta-negra-oversize",
    nombre: "Camiseta Negra Oversize",
    descripcion: "Corte largo, ideal para estilo urbano.",
    precio: 25,
    categoria: "Ropa",
    imagen: "https://images.unsplash.com/photo-1520975910258-7d0e9a65a2e4",
    variantes: ["M", "L", "XL"],
    destacado: true,
    activo: true,
  },
  {
    id: "polo-azul-marino",
    nombre: "Polo Azul Marino",
    descripcion: "Polo clásico con botones y detalle en contraste.",
    precio: 30,
    categoria: "Ropa",
    imagen: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
    variantes: ["S", "M", "L"],
    destacado: false,
    activo: true,
  },
  {
    id: "jersey-cuello-alto-gris",
    nombre: "Jersey Cuello Alto Gris",
    descripcion: "Tejido cálido, perfecto para otoño.",
    precio: 45,
    categoria: "Ropa",
    imagen: "https://images.unsplash.com/photo-1602810316673-16c7450f19c8",
    variantes: ["M", "L", "XL"],
    destacado: true,
    activo: true,
  },
  {
    id: "chaqueta-vaquera-azul",
    nombre: "Chaqueta Vaquera Azul",
    descripcion: "Denim clásico con bolsillos frontales.",
    precio: 55,
    categoria: "Ropa",
    imagen: "https://images.unsplash.com/photo-1580296460463-57494a2abc68",
    variantes: ["S", "M", "L"],
    destacado: false,
    activo: true,
  },
  {
    id: "zapatillas-blancas-minimal",
    nombre: "Zapatillas Blancas Minimal",
    descripcion: "Líneas claras y estilo minimalista.",
    precio: 60,
    categoria: "Calzado",
    imagen: "https://images.unsplash.com/photo-1575635139733-7195a4cf23dc",
    variantes: ["38", "39", "40", "41", "42"],
    destacado: true,
    activo: true,
  },
  {
    id: "sandalias-plegadas-kaki",
    nombre: "Sandalias Plegables Kaki",
    descripcion: "Ligeras y cómodas, perfectas para verano.",
    precio: 28,
    categoria: "Calzado",
    imagen: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
    variantes: ["36", "37", "38", "39"],
    destacado: false,
    activo: true,
  },
  {
    id: "bolso-bandolera-negro",
    nombre: "Bolso Bandolera Negro",
    descripcion: "Compacto, elegante y funcional.",
    precio: 40,
    categoria: "Accesorios",
    imagen: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    variantes: [],
    destacado: true,
    activo: true,
  },
  {
    id: "gafas-sol-redondas",
    nombre: "Gafas de Sol Redondas",
    descripcion: "Montura metálica dorada, lentes polarizadas.",
    precio: 25,
    categoria: "Accesorios",
    imagen: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg",
    variantes: [],
    destacado: false,
    activo: true,
  },
  {
    id: "reloj-minimalista-plata",
    nombre: "Reloj Minimalista Plateado",
    descripcion: "Correa metálica fina y esfera sencilla.",
    precio: 65,
    categoria: "Accesorios",
    imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    variantes: [],
    destacado: true,
    activo: true,
  },
  {
    id: "bufanda-lana-beige",
    nombre: "Bufanda de Lana Beige",
    descripcion: "Suave, cálida y versátil.",
    precio: 22,
    categoria: "Accesorios",
    imagen: "https://images.pexels.com/photos/374832/pexels-photo-374832.jpeg",
    variantes: [],
    destacado: false,
    activo: true,
  },
  {
    id: "gorra-baseball-negra",
    nombre: "Gorra Baseball Negra",
    descripcion: "Unisex, estilo deportivo casual.",
    precio: 18,
    categoria: "Accesorios",
    imagen: "https://images.unsplash.com/photo-1501472312653-767a2cf1f2f6",
    variantes: [],
    destacado: false,
    activo: true,
  },
  {
    id: "pantalon-chino-azul",
    nombre: "Pantalón Chino Azul",
    descripcion: "Corte moderno, ideal para looks casual-formales.",
    precio: 38,
    categoria: "Ropa",
    imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    variantes: ["38", "40", "42", "44"],
    destacado: false,
    activo: true,
  },
  {
    id: "vestido-falda-larga",
    nombre: "Vestido Falda Larga Floral",
    descripcion: "Estilo boho, estampado floral suave.",
    precio: 50,
    categoria: "Ropa",
    imagen:
      "https://images.pexels.com/photos/1027133/pexels-photo-1027133.jpeg",
    variantes: ["S", "M", "L"],
    destacado: true,
    activo: true,
  },
  {
    id: "camiseta-estampado-grafico",
    nombre: "Camiseta Estampado Gráfico",
    descripcion: "Logo grande en frontal, algodón ligero.",
    precio: 20,
    categoria: "Ropa",
    imagen: "https://images.unsplash.com/photo-1593032465173-58c19c05d76f",
    variantes: ["S", "M", "L", "XL"],
    destacado: false,
    activo: true,
  },
];

async function importar() {
  for (const producto of productos) {
    await setDoc(doc(collection(db, "productos"), producto.id), producto);
    console.log(`✅ Producto importado: ${producto.nombre}`);
  }
}

importar();
