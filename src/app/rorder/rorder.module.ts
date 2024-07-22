import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RorderPageRoutingModule } from './rorder-routing.module';

import { RorderPage } from './rorder.page';

import { NgPipesModule } from 'ngx-pipes';
import { OrdertotalPipe } from '../ordertotal.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RorderPageRoutingModule,
    NgPipesModule,
  ],
  declarations: [RorderPage],
})
export class RorderPageModule {}
