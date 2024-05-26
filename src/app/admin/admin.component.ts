import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento/evento.service';
import { Evento } from '../evento/evento';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { User } from 'src/app/app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  eventos: Evento[] = [];
  loggedUser: any;
  isSignedIn: boolean = false;

  constructor(public eventoService: EventoService, public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService
  ) { }
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
    
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
 
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
