import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

import { AuthGuard } from '../guards/auth.guard';
import { CreateComponent } from './create/create.component';

import { EditComponent } from './edit/edit.component';

  

const routes: Routes = [

  { path: 'admin/resena', redirectTo: 'admin/resena/index', pathMatch: 'full'},

  { path: 'admin/resena/index', component: IndexComponent},


  { path: 'admin/resena/create', component: CreateComponent },

  { path: 'admin/resena/:resenaId/edit', component: EditComponent } 

];

  

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class AdminResenaRoutingModule { }

