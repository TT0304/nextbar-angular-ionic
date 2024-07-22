import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPageRoutingModule } from './config-routing.module';

import { ConfigPage } from './config.page';

import { SearchPipetwo } from 'src/app/searchtwo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPageRoutingModule
  ],
  declarations: [ConfigPage,SearchPipetwo]
})
export class ConfigPageModule {}
