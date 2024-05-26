import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MyindexComponent } from './myindex/myindex.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'reserva', redirectTo: 'reserva/myindex', pathMatch: 'full'},
  { path: 'reserva/myindex', component: MyindexComponent },

  { path: 'reserva/create', component: CreateComponent },
  { path: 'reserva/:reservaId/edit', component: EditComponent }, 
  { path: 'reserva/:reservaId/view', component: ViewComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
