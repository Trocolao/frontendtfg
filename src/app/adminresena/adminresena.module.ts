import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { AdminResenaRoutingModule } from './adminresena-routing.module';
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
    AdminResenaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminResenaModule { }