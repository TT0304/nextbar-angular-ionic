import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RacunidtlPage } from './racunidtl.page';

const routes: Routes = [
  {
    path: '',
    component: RacunidtlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RacunidtlPageRoutingModule {}
