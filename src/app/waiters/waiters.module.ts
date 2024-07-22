import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitersPageRoutingModule } from './waiters-routing.module';

import { WaitersPage } from './waiters.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitersPageRoutingModule,
    NgPipesModule
  ],
  declarations: [WaitersPage]
})
export class WaitersPageModule {}
