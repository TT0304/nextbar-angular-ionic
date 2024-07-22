import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompletedPageRoutingModule } from './register-completed-routing.module';

import { RegisterCompletedPage } from './register-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompletedPageRoutingModule
  ],
  declarations: [RegisterCompletedPage]
})
export class RegisterCompletedPageModule {}
