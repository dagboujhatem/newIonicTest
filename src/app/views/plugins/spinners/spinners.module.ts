import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    BadgeModule,
    ButtonModule,
    CardModule,
    GridModule,
    SpinkitModule,
    SpinnerModule,
} from '@coreui/angular';

// Spinners
import { SpinnersComponent } from './spinners.component';

// Routing
import { SpinnersRoutingModule } from './spinners-routing.module';

//
@NgModule({
    imports: [
        SpinnersRoutingModule,
        ButtonModule,
        CommonModule,
        CardModule,
        GridModule,
        SpinkitModule,
        SpinnerModule,
        BadgeModule,
    ],
  declarations: [SpinnersComponent],
})
export class SpinnersModule {}
