import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatoRoutingModule } from './plato-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ViewComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    PlatoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlatoModule { }
