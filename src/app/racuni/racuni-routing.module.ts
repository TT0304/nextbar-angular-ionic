import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RacuniPage } from './racuni.page';

const routes: Routes = [
  {
    path: '',
    component: RacuniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RacuniPageRoutingModule {}
