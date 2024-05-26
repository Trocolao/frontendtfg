import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { EventoService } from '../evento.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';   
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    
  form!: FormGroup;
  imageSrc: string='';
  selectedImage!: any;
  loggedUser: any;
  isSignedIn: boolean = false;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    public auth: AuthService, private router:Router,    public token: TokenService,public authService: AuthStateService
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      limite_participantes: new FormControl('', Validators.required),  
      fecha: new FormControl('', Validators.required),    
      file: new FormControl('', Validators.required)
    });
    this.authService.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();

    // this.postService.getAllCategorias().subscribe((data:any)=>{
    //   this.categorias = data.categorias;
    // })
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
  // submit(){
  //   console.log(this.form.value);
  //   this.postService.create(this.form.value).subscribe((res:any) => {
  //        console.log('Post created successfully!');
  //        this.router.navigateByUrl('post/index');
  //   })
  // }

  submit(form: FormGroup){
    const formData = new FormData();

    formData.append('nombre', form.value.nombre);
    formData.append('descripcion', form.value.descripcion);
    formData.append('limite_participantes', form.value.limite_participantes);
    formData.append('fecha', form.value.fecha);
    
    formData.append('file', this.selectedImage);
    console.log(formData);

    this.eventoService.create(formData).subscribe((res:any) => {
         console.log('Evento created successfully!');
         this.router.navigateByUrl('admin/evento/index');
    })
  }

  onSelectFile(event:any){
    if( event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }
  getUserLogged(){
    this.auth.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  
}