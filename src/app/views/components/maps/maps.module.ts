import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsRoutingModule } from './google-maps-routing.module';

import { BadgeModule, CardModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsRoutingModule,
    CardModule,
    IconModule,
    BadgeModule,
  ],
  providers: [],
  declarations: [GoogleMapsComponent],
  exports: [GoogleMapsComponent],
  bootstrap: [GoogleMapsComponent],
})
export class MapsModule {}
