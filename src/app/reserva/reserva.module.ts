import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MyindexComponent } from './myindex/myindex.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    EditComponent,
    ViewComponent,
    MyindexComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReservaModule { }
