import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterOrdersPage } from './waiter-orders.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterOrdersPageRoutingModule {}
