import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderdtlPageRoutingModule } from './orderdtl-routing.module';

import { OrderdtlPage } from './orderdtl.page';

import { NgPipesModule } from 'ngx-pipes';
import { OrdertotalPipe } from '../ordertotal.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrderdtlPageRoutingModule],
  declarations: [OrderdtlPage],
})
export class OrderdtlPageModule {}
