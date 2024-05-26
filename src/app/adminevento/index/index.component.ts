import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/app.component';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  eventos: Evento[] = [];
  loggedUser: any;
  id!:number;
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
    

    
    this.eventoService.getAll().subscribe((data: Evento[])=>{
      this.eventos = data;
      console.log(this.eventos);
    });
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
  deleteEvento(id:number){
    this.eventoService.delete(id).subscribe(res => {
         this.eventos = this.eventos.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
    
}