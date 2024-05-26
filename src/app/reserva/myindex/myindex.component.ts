import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { ReservaService } from '../reserva.service';
import { Reserva } from '../reserva';
@Component({
  selector: 'app-myindex',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyindexComponent implements OnInit{
  reservas: Reserva[] = [];
  isSignedIn: boolean = false;
  loggedUser: any;


  constructor(public reservaService:ReservaService,
    private authService:AuthService,
    private auth:AuthStateService,
    public token: TokenService,
    public router:Router
    ){}

  ngOnInit(): void {
    this.reservaService.getAllByUser().subscribe((data:Reserva[])=>{
      this.reservas = data;
      console.log(this.reservas);
    });

    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    })
    this.getUserLogged();
  }

  deletePost(id:number){
    this.reservaService.delete(id).subscribe(res=>{
      this.reservas = this.reservas.filter(item => item.id !== id);
    })
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
