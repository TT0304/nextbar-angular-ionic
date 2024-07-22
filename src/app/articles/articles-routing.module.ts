import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesPage } from './articles.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesPage
  },
  {
    path: 'add-articles',
    loadChildren: () => import('../add-articles/add-articles.module').then( m => m.AddArticlesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesPageRoutingModule {}
