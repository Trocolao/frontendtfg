import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  { path: 'admin/pedido', redirectTo: 'admin/pedido/index', pathMatch: 'full'},
  { path: 'admin/pedido/index', component: IndexComponent},
  { path: 'admin/pedido/:pedidoId/view', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPedidoRoutingModule { }
