import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderdtlPage } from './orderdtl.page';

const routes: Routes = [
  {
    path: '',
    component: OrderdtlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderdtlPageRoutingModule {}
