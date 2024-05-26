import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  evento!: Evento;
  image: string = "";
  isUserInEvent:boolean=false;
  isSignedIn:boolean=false;

  isEventFull:boolean=false;
  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthStateService
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['eventoId'];

    this.eventoService.find(this.id).subscribe((data: Evento) => {
      this.evento = data;
      this.image = this.serverURL + this.evento.files[0].file_path;
      console.log(this.image);
    });
    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });   
     this.eventoService.isUserInEvent(this.id).subscribe((data:boolean)=>{
      this.isUserInEvent=data;
      console.log(data);
    });
    this.eventoService.isEventFull(this.id).subscribe((data:boolean)=>{
      this.isEventFull=data;
      console.log(data);
    })
  }
  

 /* firma(id: Number) {
    this.eventoService.firmar(id).subscribe((data: Evento) => {
      this.evento = data;
      this.router.navigateByUrl('evento/index');
    })
  }*/
  unirevento(id:number){
    this.eventoService.unirse(id).subscribe((data:Evento)=>{
      this.evento=data;
      console.log(this.evento);
      this.router.navigateByUrl('evento/index');
    });
  }
  desunirevento(id:number){
    this.eventoService.desapuntarse(id).subscribe((data:Evento)=>{
      this.evento=data;
      console.log(this.evento);
      this.router.navigateByUrl('evento/index');
    })
  }

}