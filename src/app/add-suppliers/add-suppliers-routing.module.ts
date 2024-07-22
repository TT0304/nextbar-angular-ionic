import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSuppliersPage } from './add-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: AddSuppliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSuppliersPageRoutingModule {}
