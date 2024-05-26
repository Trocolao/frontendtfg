import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../plato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plato } from '../plato';
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
  plato!: Plato;
  form!: FormGroup;
  loggedUser: any;
  isSignedIn: boolean = false;  
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
    this.platoService.find(this.id).subscribe((data: Plato)=>{
      this.plato = data;
    }); 
         
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
    });
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
    this.platoService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Plato updated successfully!');
         this.router.navigateByUrl('admin/plato/index');
    })
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}