import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGoodsPageRoutingModule } from './add-goods-routing.module';

import { AddGoodsPage } from './add-goods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGoodsPageRoutingModule
  ],
  declarations: [AddGoodsPage]
})
export class AddGoodsPageModule {}
