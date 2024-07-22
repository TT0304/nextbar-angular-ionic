import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticlesPage } from './add-articles.page';

const routes: Routes = [
  {
    path: '',
    component: AddArticlesPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddArticlesPageRoutingModule {}
