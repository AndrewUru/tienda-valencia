import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDestacados(): Promise<Producto[]> {
  const q = query(collection(db, "productos"), where("destacado", "==", true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Producto)
  );
}

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
};
