import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../plato.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  plato!: Plato;
  image: string = "";
  loggedUser: any;
  isSignedIn: boolean = false;
  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public platoService: PlatoService,
    private route: ActivatedRoute,
    public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['platoId'];

    this.platoService.find(this.id).subscribe((data: Plato) => {
      this.plato = data;
      this.image = this.serverURL + this.plato.imagenes[0].file_path;
      console.log(this.plato);
    });
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
  }

  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }

}
