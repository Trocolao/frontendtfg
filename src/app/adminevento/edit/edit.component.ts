import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';
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
  evento!: Evento;
  form!: FormGroup;
  isSignedIn: boolean = false;
  loggedUser: any;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    private route: ActivatedRoute,
    public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['eventoId'];
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
    this.eventoService.find(this.id).subscribe((data: Evento)=>{
      this.evento = data;
    }); 
      
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      limite_participantes: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
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
    this.eventoService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Evento updated successfully!');
         this.router.navigateByUrl('admin/evento/index');
    })
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
   
}