import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterTablesPage } from './waiter-tables.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterTablesPage
  },
  {
    path: 'waiter-articles',
    loadChildren: () => import('../waiter-articles/waiter-articles.module').then( m => m.WaiterArticlesPageModule)
  },
  {
    path: 'waiter-orders',
    loadChildren: () => import('../waiter-orders/waiter-orders.module').then( m => m.WaiterOrdersPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterTablesPageRoutingModule {}
