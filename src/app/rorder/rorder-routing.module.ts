import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RorderPage } from './rorder.page';

const routes: Routes = [
  {
    path: '',
    component: RorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RorderPageRoutingModule {}
