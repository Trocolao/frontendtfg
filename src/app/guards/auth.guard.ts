import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AuthStateService } from '../shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
export class User {
  name: any;
  email: any;
  id:any;
  role:any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isSignedIn: boolean = false;
  isAdminUser:boolean=false;
  loggedUser: any;

  constructor(private authService: AuthService, private router: Router, private authStateService:AuthStateService,    public token: TokenService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    
      

      if(this.loggedUser.id==1){
        return true;
      }else{
        this.router.navigate(['/home']);
        return false;
      }
     

  }
  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  
}
