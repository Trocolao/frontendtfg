import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { Pedido } from '../pedido';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
       loggedUser: any;
  isSignedIn: boolean = false;
  pedidos: Pedido[] = [];
  constructor(public pedidoService: PedidoService,public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService) { }
  private serverURL = "http://localhost:8000/"

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    
    this.getUserLogged();
    this.pedidoService.index().subscribe((data: Pedido[])=>{
      this.pedidos = data;
      console.log(this.pedidos);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePedido(id:number){
    this.pedidoService.destroy(id).subscribe(res => {
         this.pedidos = this.pedidos.filter(item => item.id !== id);
         console.log('Pedido deleted successfully!');
    })
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
    
}