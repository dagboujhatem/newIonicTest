import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Timepicker
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Ng2-select
import { NgSelectModule } from '@ng-select/ng-select';

// CoreUI
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule, TextMaskModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

// Routing
import { AdvancedFormsRoutingModule } from './advanced-forms-routing.module';

import { AdvancedFormsComponent } from './advanced-forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdvancedFormsRoutingModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // SelectModule,
    NgSelectModule,
    CardModule,
    GridModule,
    ButtonModule,
    FormModule,
    IconModule,
    AlertModule,
    TextMaskModule,
  ],
  declarations: [
    AdvancedFormsComponent
  ]
})
export class AdvancedFormsModule { }
