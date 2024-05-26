import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  { path: 'admin/reserva', redirectTo: 'admin/reserva/index', pathMatch: 'full'},
  { path: 'admin/reserva/index', component: IndexComponent },

  { path: 'admin/reserva/create', component: CreateComponent },
  { path: 'admin/reserva/:reservaId/edit', component: EditComponent }, 
  { path: 'admin/reserva/:reservaId/view', component: ViewComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReservaRoutingModule { }

