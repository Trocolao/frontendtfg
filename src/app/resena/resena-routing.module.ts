import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';


import { CreateComponent } from './create/create.component';

import { EditComponent } from './edit/edit.component';

  

const routes: Routes = [

  { path: 'resena', redirectTo: 'resena/index', pathMatch: 'full'},

  { path: 'resena/index', component: IndexComponent },


  { path: 'resena/create', component: CreateComponent },

  { path: 'resena/:resenaId/edit', component: EditComponent } 

];

  

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class ResenaRoutingModule { }
