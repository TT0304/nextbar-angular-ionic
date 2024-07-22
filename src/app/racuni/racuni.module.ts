import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacuniPageRoutingModule } from './racuni-routing.module';

import { RacuniPage } from './racuni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacuniPageRoutingModule
  ],
  declarations: [RacuniPage]
})
export class RacuniPageModule {}
