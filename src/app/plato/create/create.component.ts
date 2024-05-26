import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PlatoService } from '../plato.service';
     
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    
  form!: FormGroup;
  imageSrc: string='';
  selectedImage!: any;
 
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public platoService: PlatoService,
    private router: Router
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
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
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
    formData.append('categoria', form.value.categoria);
    formData.append('precio', form.value.precio);
    formData.append('file', this.selectedImage);
    console.log(formData);
    this.platoService.create(formData).subscribe((res:any) => {
         console.log('Plato created successfully!');
         this.router.navigateByUrl('plato/index');
    })
  }
  onSelectFile(event:any){
    if( event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }
  
  
}
