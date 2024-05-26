import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
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
  reserva!: Reserva;
  loggedUser: any;
  isSignedIn: boolean = false;
  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reservaService: ReservaService,
    private route: ActivatedRoute,
    public auth: AuthService, private router:Router,   public token: TokenService,public authService: AuthStateService  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['reservaId'];

    this.reservaService.find(this.id).subscribe((data: Reserva) => {
      this.reserva = data;
    });
       
   
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
   
  }
  

 /* firma(id: Number) {
    this.eventoService.firmar(id).subscribe((data: Evento) => {
      this.evento = data;
      this.router.navigateByUrl('evento/index');
    })
  }*/
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  

}
