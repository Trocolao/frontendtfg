import { Component } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Reserva} from '../reserva';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  reservas: Reserva[] = [];
  loggedUser: any;
  isSignedIn: boolean = false;
  constructor(public reservaService: ReservaService,public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.reservaService.getAll().subscribe((data: Reserva[])=>{
      this.reservas = data;
      console.log(this.reservas);
    })  
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteReserva(id:number){
    this.reservaService.delete(id).subscribe(res => {
         this.reservas = this.reservas.filter(item => item.id !== id);
         console.log('plato deleted successfully!');
    })
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
