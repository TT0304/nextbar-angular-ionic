import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        
      },
      {
        path: 'articles',
        loadChildren: () => import('../articles/articles.module').then( m => m.ArticlesPageModule)
      },

    ])
  ],
  declarations: [HomePage],
  exports:[],
})
export class HomePageModule {}
