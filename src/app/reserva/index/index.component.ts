import { Component } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Reserva} from '../reserva';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  reservas: Reserva[] = [];
  constructor(public reservaService: ReservaService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.reservaService.getAll().subscribe((data: Reserva[])=>{
      this.reservas = data;
      console.log(this.reservas);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteReserva(id:number){
    this.reservaService.delete(id).subscribe(res => {
         this.reservas = this.reservas.filter(item => item.id !== id);
         console.log('plato deleted successfully!');
    })
  }
}
