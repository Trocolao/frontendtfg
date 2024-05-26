import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReservaRoutingModule } from './adminreserva-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    EditComponent,
    ViewComponent,
    
  ],
  imports: [
    CommonModule,
    AdminReservaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminReservaModule { }
