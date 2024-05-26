import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  reserva!: Reserva;
  form!: FormGroup;
  validSubmission: boolean = true;
  reservaExiste:boolean=false;
  errorMessage: string = '';
isSignedIn:boolean=false;
loggedUser: any;


  constructor(
    public reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthStateService,
    private authService:AuthService,
    private token:TokenService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['reservaId'];
    this.reservaService.find(this.id).subscribe((data: Reserva) => {
      this.reserva = data;
      this.form.patchValue(data); // Patching the form with the existing data
    });
    
    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });
    this.getUserLogged();
   

    this.form = new FormGroup({
      numero_comensales: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      dia: new FormControl('', [Validators.required, this.minDateValidator()]),
      turno: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
    });

    this.form.valueChanges.subscribe(values => {
      this.checkValidity(values.hora, values.turno);
    });
  }

  get f(){
    return this.form.controls;
  }

  checkValidity(hora: string, turno: string) {
    if ((turno === 'comida' && parseInt(hora) >= 20 && parseInt(hora) <= 23) ||
        (turno === 'cena' && parseInt(hora) >= 13 && parseInt(hora) <= 16)) {
      this.validSubmission = false;
      this.errorMessage = 'La hora seleccionada no corresponde al turno.';
    } else {
      this.validSubmission = true;
      this.errorMessage = '';
    }
  }

  submit() {
    if (!this.validSubmission) {
      alert(this.errorMessage);
      return;
    }
    this.reservaService.verificarReserva(this.form.value.dia, this.form.value.turno).subscribe((data) => {
      this.reservaExiste = data;
      console.log(this.reservaExiste);

      if (this.reservaExiste) {
        return;
      }

      this.reservaService.update(this.id, this.form.value).subscribe((res: any) => {
        console.log('Reserva updated successfully!');
        this.router.navigateByUrl('/reserva/myindex');
      });
    });
  }

  minDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      // Ajustamos la fecha de hoy a medianoche y sumamos un día
      today.setHours(0, 0, 0, 0);
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 1);

      return selectedDate >= minDate ? null : { minDate: true };
    };
  }
  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
