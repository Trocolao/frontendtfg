import { Component } from '@angular/core';
import { PlatoService } from '../plato.service';
import { Plato} from '../plato';
import  {Itempedido} from '../itempedido';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  platos: Plato[] = [];
  constructor(public platoService: PlatoService, public auth:AuthStateService) { }
  isSignedIn: boolean = false;
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.platoService.getAll().subscribe((data: Plato[])=>{
      this.platos = data;
      console.log(this.platos);
    });
    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
    this.platoService.delete(id).subscribe(res => {
         this.platos = this.platos.filter(item => item.id !== id);
         console.log('plato deleted successfully!');
    })
  }
  agregarCarrito(plato:Plato){
    console.log(plato);
    let iCarrito: Itempedido={
      id: plato.id,
      descripcion:plato.descripcion,
      nombre: plato.nombre,
      precio: plato.precio,
      cantidad:1
    }
    if(localStorage.getItem("carrito")===null){
      let carrito:Itempedido[]=[];
    carrito.push(iCarrito);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    }else{
      let carritoStorage=localStorage.getItem("carrito") as string;
      let carrito=JSON.parse(carritoStorage);
      let index=-1;
      for(let i=0;i<carrito.length;i++){
        let itemC: Itempedido=carrito[i];
        if(iCarrito.id===itemC.id){
          index=i;
          break;
        }
      }
      if(index===-1){
        carrito.push(iCarrito);
      localStorage.setItem("carrito",JSON.stringify(carrito));
      }else{
        let itemCarrito:Itempedido=carrito[index];
        itemCarrito.cantidad!++;
        carrito[index]=itemCarrito;
        localStorage.setItem("carrito",JSON.stringify(carrito));        
      }
      
    }
    
  }
}
