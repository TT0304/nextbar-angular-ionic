import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsPage } from './goods.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsPageRoutingModule {}
