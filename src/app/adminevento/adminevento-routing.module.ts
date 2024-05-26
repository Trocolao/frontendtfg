import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  { path: 'admin/evento/index', component: IndexComponent  },
  { path: 'admin/evento/:eventoId/view', component: ViewComponent },
  { path: 'admin/evento/create', component: CreateComponent },
  { path: 'admin/evento/:eventoId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmineventoRoutingModule { }

