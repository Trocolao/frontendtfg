import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'pedido', redirectTo: 'pedido/myindex', pathMatch: 'full'},
  { path: 'pedido/myindex', component: IndexComponent },
  { path: 'pedido/:pedidoId/view', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
