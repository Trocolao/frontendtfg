import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../guards/auth.guard';  

const routes: Routes = [
  { path: 'admin/plato', redirectTo: 'admin/plato/index', pathMatch: 'full'},
  { path: 'admin/plato/index', component: IndexComponent },
  { path: 'admin/plato/:platoId/view', component: ViewComponent },
  { path: 'admin/plato/create', component: CreateComponent },
  { path: 'admin/plato/:platoId/edit', component: EditComponent }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPlatoRoutingModule { }
