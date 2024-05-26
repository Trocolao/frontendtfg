import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResenaService } from '../resena.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  resenaForm!: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  loggedUser: any;
  isSignedIn: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private resenaService: ResenaService,
    public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService  ) { }

  ngOnInit(): void {
    this.resenaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      valoracion: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    
    this.getUserLogged();
  }

  rate(star: number): void {
    this.resenaForm.controls['valoracion'].setValue(star);
  }

  create(): void {
    if (this.resenaForm.valid) {
      this.resenaService.create(this.resenaForm.value).subscribe(
        (data) => {
          console.log('Reseña creada exitosamente:', data);
          this.router.navigate(['/admin/resena/index']);
        },
        (error) => {
          console.error('Error al crear la reseña:', error);
        }
      );
    }
  }
  
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
