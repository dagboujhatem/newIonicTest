import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import { BadgeModule, CardModule } from '@coreui/angular';

import { FullCalendarNgComponent } from './full-calendar-ng.component';
// Routing
import { FullCalendarNgRoutingModule } from './full-calendar-ng-routing.module';


FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [FullCalendarNgComponent],
    imports: [CommonModule, FullCalendarNgRoutingModule, FullCalendarModule, CardModule, BadgeModule],
})
export class FullCalendarNgModule {}
