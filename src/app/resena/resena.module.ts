import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResenaRoutingModule } from './resena-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ResenaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResenaModule { }
