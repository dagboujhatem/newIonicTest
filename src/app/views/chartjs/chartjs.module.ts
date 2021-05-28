import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardModule,
  GridModule,
  ChartModule,
  SharedModule,
  BadgeModule,
} from '@coreui/angular';

import { ChartjsComponent } from './chartjs.component';
import { ChartjsRoutingModule } from './chartjs-routing.module';

@NgModule({
  declarations: [ChartjsComponent],
  imports: [
    CommonModule,
    ChartjsRoutingModule,
    ChartModule,
    CardModule,
    GridModule,
    BadgeModule,
  ],
})
export class ChartjsModule {}
