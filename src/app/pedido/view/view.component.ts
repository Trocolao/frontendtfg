import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../pedido';
import { Plato } from '../plato';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  pedido!: Pedido;
  platos!: Plato[];
isSignedIn:boolean=false;
loggedUser:any;
  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthStateService, private authService:AuthService, private token:TokenService
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['pedidoId'];

    this.pedidoService.show(this.id).subscribe((data: Pedido) => {
      this.pedido = data;
      console.log(this.pedido);
    });
    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
   
   
  }
  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }

  

}

