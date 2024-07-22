import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterArticlesPage } from './waiter-articles.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterArticlesPageRoutingModule {}
