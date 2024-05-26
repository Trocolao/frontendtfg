import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../plato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plato } from '../plato';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  plato!: Plato;
  image: string = "";

  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public platoService: PlatoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['platoId'];

    this.platoService.find(this.id).subscribe((data: Plato) => {
      this.plato = data;
      this.image = this.serverURL + this.plato.imagenes[0].file_path;
      console.log(this.plato);
    });
  }

  

}
