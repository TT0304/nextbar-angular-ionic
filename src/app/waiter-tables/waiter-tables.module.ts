import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterTablesPageRoutingModule } from './waiter-tables-routing.module';

import { WaiterTablesPage } from './waiter-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterTablesPageRoutingModule
  ],
  declarations: [WaiterTablesPage]
})
export class WaiterTablesPageModule {}
