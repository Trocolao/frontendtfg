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
  resena!: any;
  form!: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
isSignedIn:boolean=false;
loggedUser:any;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public resenaService: ResenaService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthStateService,
    private authState:AuthService,
    private token:TokenService
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['resenaId'];
    this.resenaService.find(this.id).subscribe((data: any)=>{
      this.resena = data;
      console.log(this.resena);
    });
    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
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
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.resenaService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Resena updated successfully!');
         this.router.navigateByUrl('resena/index');
    })
  }
  
  getUserLogged(){
    this.authState.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
   
}
