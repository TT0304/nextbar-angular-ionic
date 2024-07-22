import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCompletedPage } from './register-completed.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCompletedPageRoutingModule {}
