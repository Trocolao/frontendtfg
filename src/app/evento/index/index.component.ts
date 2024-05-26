import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  eventos: Evento[] = [];
  constructor(public eventoService: EventoService) { }
  private serverURL = "http://localhost:8000/"

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.eventoService.getAll().subscribe((data: Evento[])=>{
      this.eventos = data;
      console.log(this.eventos);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteEvento(id:number){
    this.eventoService.delete(id).subscribe(res => {
         this.eventos = this.eventos.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
    
}