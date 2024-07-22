import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacunidtlPageRoutingModule } from './racunidtl-routing.module';

import { RacunidtlPage } from './racunidtl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacunidtlPageRoutingModule
  ],
  declarations: [RacunidtlPage]
})
export class RacunidtlPageModule {}
