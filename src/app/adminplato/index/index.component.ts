import { Component } from '@angular/core';
import { PlatoService } from '../plato.service';
import { Plato} from '../plato';
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
  platos: Plato[] = [];
  constructor(public platoService: PlatoService, public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService) { }
  loggedUser: any;
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
  deletePost(id:number){
    this.platoService.delete(id).subscribe(res => {
         this.platos = this.platos.filter(item => item.id !== id);
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
