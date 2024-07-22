import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodsPageRoutingModule } from './goods-routing.module';

import { GoodsPage } from './goods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodsPageRoutingModule
  ],
  declarations: [GoodsPage]
})
export class GoodsPageModule {}
