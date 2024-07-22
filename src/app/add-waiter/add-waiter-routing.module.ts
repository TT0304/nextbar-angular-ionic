import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWaiterPage } from './add-waiter.page';

const routes: Routes = [
  {
    path: '',
    component: AddWaiterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWaiterPageRoutingModule {}
