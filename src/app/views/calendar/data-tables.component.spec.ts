import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/timegrid';
import resourceDayGridPlugin from '@fullcalendar/daygrid';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin,
  resourceTimeGridPlugin,
  resourceDayGridPlugin
]);

import { FullCalendarNgComponent } from './data-tables.component';

describe('FullCalendarNgComponent', () => {
  let component: FullCalendarNgComponent;
  let fixture: ComponentFixture<FullCalendarNgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCalendarNgComponent ],
      imports: [FullCalendarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCalendarNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
