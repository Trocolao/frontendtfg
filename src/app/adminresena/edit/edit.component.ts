import { Component, OnInit } from '@angular/core';
import { ResenaService } from '../resena.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resena } from '../resena';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  id!: number;
  resena!: Resena;
  form!: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  loggedUser: any;
  isSignedIn: boolean = false;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public resenaService: ResenaService,
    private route: ActivatedRoute,
    public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['resenaId'];
    this.resenaService.find(this.id).subscribe((data: Resena)=>{
      this.resena = data;
    }); 
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
    this.form = new FormGroup({
      valoracion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
    });
  }
  rate(star: number): void {
    this.form.controls['valoracion'].setValue(star);
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.resenaService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Resena updated successfully!');
         this.router.navigateByUrl('/admin/resena/index');
    })
  }
   
}
