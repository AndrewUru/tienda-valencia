//src\types.ts
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  categoria: string;
  imagen: string;
  variantes: string[];
  destacado: boolean;
  activo: boolean;
  marca: string;
  rating: number;
  reviews: number;
  stock: number;
  descuento?: number;
  nuevo?: boolean;
  bestseller?: boolean;
  colores?: string[];
  tallas?: string[];
}
