import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { ResenaService } from '../resena.service';
import { Resena } from '../resena';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  resenas: Resena[] = [];
  isSignedIn: boolean = false;
  loggedUser: any;

  constructor(
    public resenaService: ResenaService,
    private auth: AuthStateService,
    private router: Router,
    private authservice:AuthService
  ) {}

  ngOnInit(): void {
    this.resenaService.getAll().subscribe((data: Resena[]) => {
      this.resenas = data;
    });
    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();

  }

  getAllResenas(): void {
    
  }

  deleteResena(id: number): void {
    this.resenaService.delete(id).subscribe(() => {
      this.resenas = this.resenas.filter(item => item.id !== id);
      console.log('Reseña eliminada exitosamente!');
    });
  }

  getUserLogged(){
    this.authservice.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
