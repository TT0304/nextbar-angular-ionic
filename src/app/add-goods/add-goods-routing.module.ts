import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGoodsPage } from './add-goods.page';

const routes: Routes = [
  {
    path: '',
    component: AddGoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGoodsPageRoutingModule {}
