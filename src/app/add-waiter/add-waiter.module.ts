import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWaiterPageRoutingModule } from './add-waiter-routing.module';

import { AddWaiterPage } from './add-waiter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWaiterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddWaiterPage]
})
export class AddWaiterPageModule {}
