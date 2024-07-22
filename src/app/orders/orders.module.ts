import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { NgPipesModule } from 'ngx-pipes';
import { OrdertotalPipe } from '../ordertotal.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    NgPipesModule,
  ],
  declarations: [OrdersPage],
})
export class OrdersPageModule {}
