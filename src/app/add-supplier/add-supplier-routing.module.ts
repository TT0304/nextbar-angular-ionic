import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSupplierPage } from './add-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: AddSupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSupplierPageRoutingModule {}
