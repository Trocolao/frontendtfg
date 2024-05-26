import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { Pedido } from '../pedido';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  pedidos: Pedido[] = [];
  isSignedIn:boolean=false;
  constructor(public pedidoService: PedidoService,
    private authService:AuthService,
    private auth:AuthStateService,
    public token: TokenService,
    public router:Router
  ) { }
  private serverURL = "http://localhost:8000/"

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.pedidoService.myindex().subscribe((data: Pedido[])=>{
      this.pedidos = data;
      console.log(this.pedidos);
    }) ;
    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    }); 
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePedido(id:number){
    this.pedidoService.destroy(id).subscribe(res => {
         this.pedidos = this.pedidos.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
    
}
