import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeconfigPageRoutingModule } from './homeconfig-routing.module';

import { HomeconfigPage } from './homeconfig.page';

import { SearchPipe } from 'src/app/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeconfigPageRoutingModule
  ],
  declarations: [HomeconfigPage,SearchPipe]
})
export class HomeconfigPageModule {}
