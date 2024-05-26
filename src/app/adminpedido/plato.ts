import { Itempedido } from "./itempedido";

export interface Plato {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    file:string;
    imagenes:any;
    pivot: {
        cantidad: number;
      };
}
