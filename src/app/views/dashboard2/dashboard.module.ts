import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  CalloutModule,
  CardModule,
  GridModule,
  ProgressModule,
  ButtonModule,
  DropdownModule,
  ChartModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    // ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CalloutModule,
    CardModule,
    GridModule,
    IconModule,
    ProgressModule,
    ButtonModule,
    DropdownModule,
    ChartModule,
    SharedModule,
    WidgetModule,
    WidgetsModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
