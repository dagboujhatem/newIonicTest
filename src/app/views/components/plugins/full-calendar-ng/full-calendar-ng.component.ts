import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import { HttpService } from '../../../../services/http-service/http.service'
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  startOfDay,
  endOfDay,
  addDays,
} from 'date-fns';

@Component({
  selector: 'app-full-calendar-ng',
  templateUrl: './full-calendar-ng.component.html',
  styleUrls: ['./full-calendar-ng.component.scss'],
})
export class FullCalendarNgComponent implements OnInit, AfterViewInit {

  public dbData?;
  public isLoading: boolean = true;

  today = new Date();
  todayStr: string = this.today.toISOString().replace(/T.*$/, '');
  viewTime: '17:00';

  // events = [
  //   {
  //     id: "11",
  //     title: 'event 1',
  //     start: this.todayStr + 'T08:00:00',
  //     end: this.todayStr + 'T10:30:00',
  //     color: 'green',
  //   },
  //   {
  //     title: 'event 2',
  //     start: this.todayStr + 'T17:00:00',
  //     end: this.todayStr + 'T18:30:00',
  //   },
  //   {
  //     start: addDays(startOfDay(this.today), 1),
  //     end: addDays(endOfDay(this.today), 3),
  //     title: 'A 2 day event',
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  //events = this.dbData;
  public openEvent(info)
  {
    console.log(info);
  }
    
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('openEventModal', {static: false}) public openEventModal: ModalDirective;

  calendarOptions: CalendarOptions = {
    initialDate: this.todayStr,
    weekNumberCalculation: 'ISO',
    height: 'auto',
    contentHeight: 'auto',
    // aspectRatio: 2,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    editable: true,
    selectable: true,
    //droppable: true,
    navLinks: true,
    //events: this.events,
    eventClick: 
    function(info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate
      console.log(info.event);
      this.getEvents();
    }
  };


  constructor(private httpService: HttpService) {
    this.isLoading = true;
    this.getBookings();
  }

  ngOnInit(): void {
    this.getBookings();
    this.calendarOptions.loading(true);
  }

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    //this.calendarOptions.events = this.dbData;
    setTimeout(() => {
      calendarApi.updateSize();
    }, 1000);
  }


  public getEvents()
  {
    this.openEventModal.show();
        // const calendarApi = this.calendarComponent.getApi();
    // var event = calendarApi.getEventById("11");
    //console.log(this.dbData);
  }

  public async getBookings()
  {
    return await this.httpService.post('getBookingsCalendar', '', '')
    .then(
      data => {
        setTimeout(() => {
                this.isLoading = false;
                this.dbData = data; 
                const calendarApi = this.calendarComponent.getApi();
                this.calendarOptions.events = this.dbData;
              }, 1500);
      },
      error => {console.log(error)},
    ).catch();
  }
}
