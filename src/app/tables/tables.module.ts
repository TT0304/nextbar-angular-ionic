import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule
  ],
  declarations: [TablesPage]
})
export class TablesPageModule {}
