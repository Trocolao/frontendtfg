import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    
  form!: FormGroup;
  validSubmission: boolean = true;
  reservaExiste: boolean = false;
  errorMessage: string = '';
isSignedIn:boolean=false;

  constructor(
    public reservaservice: ReservaService,
    private router: Router, public auth: AuthStateService
  ) { }
    
  ngOnInit(): void {
    this.form = new FormGroup({
      numero_comensales: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      dia: new FormControl('', [Validators.required, this.minDateValidator()]),
      hora: new FormControl('', Validators.required),
      turno: new FormControl('', Validators.required),
    });
    this.auth.userAuthState.subscribe(data=>{
      this.isSignedIn = data;
      if(this.isSignedIn==false){
        this.router.navigate(['/']);
      }
    });

    // Subscribe to changes
    this.form.valueChanges.subscribe(values => {
      this.checkValidity(values.hora, values.turno);
    });
  }
    
  get f() {
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
    
  submit(form: FormGroup) {
    if (!this.validSubmission) {
      alert(this.errorMessage);
      return;
    }
    const formData = new FormData();
    formData.append('numero_comensales', this.form.value.numero_comensales);
    formData.append('dia', this.form.value.dia);
    formData.append('hora', this.form.value.hora);
    formData.append('turno', this.form.value.turno);

    this.reservaservice.verificarReserva(form.value.dia, form.value.turno).subscribe((data) => {
      this.reservaExiste = data;
      console.log(this.reservaExiste);

      if (this.reservaExiste) {
        return;
      }

      this.reservaservice.create(formData).subscribe({
        next: (res: any) => {
          console.log('Reserva created successfully!');
          this.router.navigateByUrl('reserva/myindex');
        },
        error: (err) => {
          console.error('Failed to create reserva', err);
        }
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
}

