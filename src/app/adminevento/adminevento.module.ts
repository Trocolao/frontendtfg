import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmineventoRoutingModule } from './adminevento-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdmineventoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminEventoModule { }
