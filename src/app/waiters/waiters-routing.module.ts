import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitersPage } from './waiters.page';

const routes: Routes = [
  {
    path: '',
    component: WaitersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitersPageRoutingModule {}
