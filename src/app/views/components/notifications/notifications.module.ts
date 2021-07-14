import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CoreUI Modules
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule, FormModule,
  GridModule,
  ModalModule,
  ProgressModule,
  ToastModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// views
import { AlertsComponent } from './alerts/alerts.component';
import { BadgesComponent } from './badges/badges.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';


// Notifications Routing
import { NotificationsRoutingModule } from './notifications-routing.module';

// Simple Toast
import { AppToastComponent } from './toasters/toast-simple/toast.component';

@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    NotificationsRoutingModule,
    AlertModule,
    BadgeModule,
    ModalModule,
    CardModule,
    GridModule,
    ButtonModule,
    ProgressModule,
    ToastModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  declarations: [
    AlertsComponent,
    BadgesComponent,
    ModalsComponent,
    ToastersComponent,
    AppToastComponent,
  ],
})
export class NotificationsModule {}
