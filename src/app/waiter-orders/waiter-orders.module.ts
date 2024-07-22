import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterOrdersPageRoutingModule } from './waiter-orders-routing.module';

import { WaiterOrdersPage } from './waiter-orders.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterOrdersPageRoutingModule,
    NgPipesModule
  ],
  declarations: [WaiterOrdersPage]
})
export class WaiterOrdersPageModule {}
