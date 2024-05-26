import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPedidoRoutingModule } from './adminpedido-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AdminPedidoRoutingModule
  ]
})
export class AdminpedidoModule { }
