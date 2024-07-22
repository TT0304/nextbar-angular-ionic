import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDetailPageRoutingModule } from './report-detail-routing.module';

import { ReportDetailPage } from './report-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportDetailPageRoutingModule
  ],
  declarations: [ReportDetailPage]
})
export class ReportDetailPageModule {}
