import { Plato } from "./plato";

export interface Pedido {
    id:number,
    fecha:string,
    total:number,
    user_id:number,
    platos: any;
}
