import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarContent, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import { HttpService } from '../../services/http-service/http.service'
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { AppToastComponent as ToastComp } from '../../services/shared-service/toast-simple/toast.component'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalInterfaceService } from '../../services/local-inteface-service/local-interface.service';
import { ValidationService } from '../../services/validation-service/validation.service';
import { StorageService } from '../../services/storege-service/storage.service';
import * as moment from 'moment';

import {
  startOfDay,
  endOfDay,
  addDays,
} from 'date-fns';
import { calendar } from 'ngx-bootstrap/chronos/moment/calendar';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { totalmem } from 'os';
import { el } from 'date-fns/locale';
import { ModalComponent } from '@coreui/angular/lib/modal/modal.component';


@Component({
  selector: 'app-full-calendar-ng',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class FullCalendarNgComponent implements OnInit, AfterViewInit {

  public dbData?;
  public dbCourtData?;
  public courts?;
  public paymentMethods?;
  public bookingAddons?;
  public bookingAddonInstances?;
  public disabledData?;
  public isLoading: boolean = true;
  public ownerId;
  public facilityId;
  public bookingId;
  public bookingName;
  public bookingMobile;
  public bookingCountryCode;
  public bookingDate;
  public bookingStartTime;
  public bookingEndTime;
  public bookingPrice;
  public bookingAddon;
  public bookingVAT;
  public bookingTotal;
  public bookingPayAmount;
  public bookingPayStatus?;
  public bookingPayDate;
  public bookingReOccur: boolean = false;
  public bookingReOccurDays;
  public bookingReOccurInstance;
  public bookingTotalWithReoocur;
  public courtPrice;
  public courtPrice30min = 0.0;
  public courtPrice60min = 0.0;
  public courtPrice90min = 0.0;
  public courtPrice120min = 0.0;
  public taxPercentage = 0;
  public ccy;
  public selectedReoccurDay;
  public bookingAddonsArray:Array<{id: number, name: String, count: number, price: number}> = [];
  //public bookingAddonsObject :object = [];
  public existingBookingAddonArray;
  totalRemainingAmount = 0.0
  public calendarCurrentDate = new Date();

  simpleForm: FormGroup;
  isUpdate: boolean = false;
  isError: boolean = false;
  isReoccur: string = '0';
  isAddonBtn: boolean = false;
  court?: string;
  addon?: string;
  paymentMethod?: string;

  today = new Date();
  todayStr: string = this.today.toISOString().replace(/T.*$/, '');
  viewTime: '17:00';

  //events = this.dbData;
  public openEvent(info)
  {
    console.log(info);
  }
    
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('openEventModal', {static: false},) public openEventModal: ModalDirective;
  @ViewChild('addBookingModal', {static: false}) public addBookingModal: ModalDirective;
  @ViewChild(ToastComp) toastComp: ToastComp;
  
  calendarOptions: CalendarOptions = {
    initialDate: this.calendarCurrentDate,
    weekNumberCalculation: 'ISO',
    height: 'auto',
    contentHeight: 'auto',
    // aspectRatio: 2,
    initialView: 'resourceTimeGridDay',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'resourceTimeGridDay,timeGridWeek,listWeek',
    },
    views: {
      dayGrid: {
        // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
      },
      day: {
        // options apply to dayGridDay and timeGridDay views
      },
      resourceTimeGridDay: {
        type: 'resourceTimeGrid',
        duration: { days: 1 },
        buttonText: '1 day'
      }
    },
    editable: true,
    selectable: true,
    navLinks: true,
    datesAboveResources:true,
    //plugins: [ timegrid ],
    eventClick: (selectedBooking) => {this.manageBooking(selectedBooking)},
    select: (selectedBooking) => {this.addBooking(selectedBooking)},
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
  };


  constructor(
    private httpService: HttpService, 
    private fb: FormBuilder, 
    private router: Router, 
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private localInterfaceSrv: LocalInterfaceService,
    private validationSrv : ValidationService,
    private storageSrv: StorageService,
    ) {
  }


  createForm() {
      this.simpleForm = this.fb.group({
      bookingId: {value: this.bookingId, disabled:true},
      court: [this.court, [Validators.required]],
      paymentMethod: [this.paymentMethod],
      addon: [this.addon],
      bookingAddonInstances: {value: this.bookingAddonInstances, disabled:true},
      bookingName: [this.bookingName, [Validators.required]],
      bookingMobile: [this.bookingMobile, [Validators.required]],
      bookingCountryCode: [this.bookingCountryCode, [Validators.required]],
      bookingDate: [this.bookingDate, [Validators.required]],
      bookingStartTime: [this.bookingStartTime, [Validators.required]],
      bookingEndTime: [this.bookingEndTime, [Validators.required]],
      bookingPrice: {value: this.bookingPrice},
      bookingAddon: {value: this.bookingAddon, disabled:true},
      bookingVAT: {value: this.bookingVAT, disabled:true},
      bookingTotal: {value: this.bookingTotal, disabled:true},
      totalRemainingAmount: {value: this.totalRemainingAmount, disabled:true},
      newBookingPrice: [this.bookingPrice],
      newBookingAddon: {value: this.bookingAddon, disabled:true},
      newBookingVAT: {value: this.bookingVAT, disabled:true},
      newBookingTotal: {value: this.bookingTotal, disabled:true},
      bookingPayAmount: {value: this.bookingPayAmount, disabled:true},
      bookingPayStatus: {value: this.bookingPayStatus, disabled:true},
      bookingPayDate: {value: this.bookingPayDate, disabled:true},
      bookingReOccur: {value: this.bookingReOccur},
      bookingReOccurDays: {value: this.bookingReOccurDays, disabled:true},
      bookingReOccurInstance: {value: this.bookingReOccurInstance, disabled:true},
      bookingTotalWithReoocur: {value: this.bookingTotalWithReoocur, disabled:true},
    }, { });
  }

  ngOnInit(): void {
    this.simpleForm = this.fb.group({});
    this.validationSrv.validateAcess()
    .then(async () => {
      this.route.queryParams.subscribe(async params => {
        
        this.facilityId = this.storageSrv.getFacilityId();
        this.ownerId = this.storageSrv.getUser();

        await this.loadCourts(this.facilityId);
        await this.loadAddons(this.facilityId);
        await this.loadBookingsCalendar(this.facilityId);
        await this.loadCourtsCalendar(this.facilityId);
        await this.loadDisabledCalendar(this.facilityId);
        await this.loadPaymentMethods(this.facilityId);
        await this.createForm();
        await this.ngAfterViewInit();
        console.log("ADDON: " + this.bookingAddon);
        this.isLoading = false;
        this.calendarOptions.initialDate = this.calendarCurrentDate;
    });
    });
  }

  checkViewDate() {
    let calendarApi = this.calendarComponent?.getApi();
    this.calendarCurrentDate = calendarApi?.getDate();
    console.log(this.calendarOptions.initialDate);
    //calendarApi?.gotoDate(this.calendarCurrentDate);
  }

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent?.getApi();
    //console.log(calendarApi.getCurrentData());
    //this.calendarOptions.events = this.dbData;
    //this.calendarOptions.initialDate = ''
    setTimeout(() => {
      calendarApi?.updateSize();
    }, 1000);
  }

  loadCourts = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getCourts(facilityId)
      .then(res => {
        this.courts = res;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  loadAddons = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getAddonsTable(facilityId)
      .then(res => {
        this.bookingAddons = res;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  loadBookingsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getBookingsCalendar(facilityId)
      .then(res => {
        this.dbData = res;
        this.calendarOptions.events = this.dbData;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  loadCourtsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getCourtsCalendar(facilityId)
      .then(res => {
        this.dbCourtData = res;
        this.calendarOptions.resources = this.dbCourtData;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  loadDisabledCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getDisabledCalendar(facilityId)
      .then(res => {
        this.disabledData = res;
        this.updateCalendar();
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  loadPaymentMethods = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getPaymentMethods(facilityId)
      .then(res => {
        this.paymentMethods = res;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        this.toastr.error(err.description, "Error");
      })
      .finally();
    });
  }

  public addBooking(selectedBooking)
  {
    this.checkViewDate();
    this.isUpdate = false;
    this.bookingReOccur = false;
    this.bookingReOccurInstance = 1;
    var startDate = new Date(selectedBooking.start);
    var endDate = new Date(selectedBooking.end);
    const minutes = (endDate.getTime() - startDate.getTime())/60000;

    var selectedCourtId = selectedBooking.resource.id;
    var taxPercent = selectedBooking.resource.extendedProps.taxPercentage/100;
    var ccy = selectedBooking.resource.extendedProps.ccy;
    this.taxPercentage = taxPercent;
    this.ccy = ccy;
    var duration = (minutes);
    var vat = 0.0;
    var total;
    var subTotalPrice;
    var addon = 0.0;
    var addonTotalPrice = 0.0;
    
    if (duration > 120)
    {
      this.toastr.error('Booking duration cannot exceed 120 minutes', "Error");
      return;
    }
    
    for (let court of this.courts.content)
    {
      if (court.id == selectedCourtId)
      {
        this.courtPrice30min = parseInt(court["30minPrice"]);
        this.courtPrice60min = parseInt(court["60minPrice"]);
        this.courtPrice90min = parseInt(court["90minPrice"]);
        this.courtPrice120min = parseInt(court["120minPrice"]);

        if (duration == 30)
        {
          this.courtPrice = this.courtPrice30min;
        }
        else if (duration == 60)
        {
          this.courtPrice = this.courtPrice60min;
        }
        else if (duration == 90)
        {
          this.courtPrice = this.courtPrice90min;
        }
        else if (duration == 120)
        {
          this.courtPrice = this.courtPrice120min;
        }
        else
        {
          this.courtPrice = this.courtPrice120min;
        }
      }
    }

    subTotalPrice = this.courtPrice;

    //this.taxPercentage = this.taxPercentage/100;


    for (let addonItem of this.bookingAddonsArray)
    {
      var addonItemPrice = addonItem.price * addonItem.count;
      addonTotalPrice = addonTotalPrice + addonItemPrice;
    }

    var totalPriceWithAddon = (subTotalPrice + addonTotalPrice);
    vat = totalPriceWithAddon * taxPercent;
    var totalPriceWithVAT = totalPriceWithAddon + vat;
    total = totalPriceWithVAT;

    console.log((duration));
    console.log(JSON.stringify(this.courts.content));
    this.simpleForm.patchValue({court: selectedCourtId});
    this.simpleForm.patchValue({bookingCountryCode: '973'});
    this.simpleForm.patchValue({bookingDate: selectedBooking.start});
    this.simpleForm.patchValue({bookingStartTime: selectedBooking.start});
    this.simpleForm.patchValue({bookingEndTime: selectedBooking.end});
    this.simpleForm.patchValue({bookingPrice: subTotalPrice, disabled:true});
    this.simpleForm.patchValue({bookingAddon: addon});
    this.simpleForm.patchValue({bookingVAT: vat, disabled:true});
    this.simpleForm.patchValue({bookingTotal: total, disabled:true});
    this.simpleForm.patchValue({bookingReOccur: this.bookingReOccur});
    this.simpleForm.patchValue({bookingReOccurInstance: this.bookingReOccurInstance});
    this.simpleForm.patchValue({bookingTotalWithReoocur: total});
    this.addBookingModal.show();
  }
  public manageBooking(info)
  {
    this.checkViewDate();
    this.isUpdate = true;
    
    var resources = info.event.getResources();
    var resourceId = resources.map(function(resource) { return resource.id });
    var duration = info.event.extendedProps.duration;
    this.taxPercentage = info.event.extendedProps.taxPercentage/100;
    //var existingAddonsArray = info.event.extendedProps.addons;
    console.log("this.taxPercentage1111"  + this.taxPercentage);

    this.bookingAddonsArray = [];
    for (let item of info.event.extendedProps.addons)
    {
      this.bookingAddonsArray.push(item);
    }
    this.existingBookingAddonArray = [...this.bookingAddonsArray];

    for (let court of this.courts.content)
    {
      if (court.id == resourceId)
      {
        this.courtPrice30min = parseInt(court["30minPrice"]);
        this.courtPrice60min = parseInt(court["60minPrice"]);
        this.courtPrice90min = parseInt(court["90minPrice"]);
        this.courtPrice120min = parseInt(court["120minPrice"]);

        if (duration == 30)
        {
          this.courtPrice = this.courtPrice30min;
        }
        else if (duration == 60)
        {
          this.courtPrice = this.courtPrice60min;
        }
        else if (duration == 90)
        {
          this.courtPrice = this.courtPrice90min;
        }
        else if (duration == 120)
        {
          this.courtPrice = this.courtPrice120min;
        }
        else
        {
          this.courtPrice = this.courtPrice120min;
        }

        //this.courtPrice = parseInt(court.price);
      }
    }

    var payStatus = info.event.extendedProps.paymentStatus;
    var paidDate = info.event.extendedProps.paidDate != null ? new Date(info.event.extendedProps.paidDate) : '';
    // if (info.event.extendedProps.paymentStatus == 1)
    // {
    //   payStatus = 'Paid';
    //   paidDate = new Date(info.event.extendedProps.paidDate);
    // }
    // else
    // {
    //   payStatus = 'Not Paid';
    // }
    var addon;
    if (info.event.extendedProps.addon == null)
    {
      addon = 0;
    }
    else
    {
      addon = info.event.extendedProps.addon;
    }
    this.bookingId = info.event.id;
    this.totalRemainingAmount = this.roundTo(parseFloat(info.event.extendedProps.totalPrice == null ? '0' : info.event.extendedProps.totalPrice) - parseFloat(info.event.extendedProps.paidAmount == null ? '0' : info.event.extendedProps.paidAmount), 3);
    this.simpleForm.patchValue({bookingId: this.bookingId});
    this.simpleForm.patchValue({court: resourceId});
    this.simpleForm.patchValue({bookingName: info.event.title});
    this.simpleForm.patchValue({bookingMobile: info.event.extendedProps.customerMobile});
    this.simpleForm.patchValue({bookingCountryCode: info.event.extendedProps.customerCountryCode});
    this.simpleForm.patchValue({bookingDate: info.event.start});
    this.simpleForm.patchValue({bookingStartTime: info.event.start});
    this.simpleForm.patchValue({bookingEndTime: info.event.end});
    this.simpleForm.patchValue({bookingPrice: info.event.extendedProps.subTotalPrice});
    this.simpleForm.patchValue({bookingAddon: addon});
    this.simpleForm.patchValue({bookingVAT: info.event.extendedProps.tax});
    this.simpleForm.patchValue({bookingTotal: info.event.extendedProps.totalPrice == null ? '0' : info.event.extendedProps.totalPrice});
    this.simpleForm.patchValue({bookingPayAmount: info.event.extendedProps.paidAmount == null ? '0' : info.event.extendedProps.paidAmount});
    this.simpleForm.patchValue({bookingPayStatus: payStatus});
    this.simpleForm.patchValue({bookingPayDate: paidDate});
    this.simpleForm.patchValue({totalRemainingAmount: this.totalRemainingAmount});
    this.simpleForm.get('paymentMethod').clearValidators();
    this.simpleForm.get('paymentMethod').updateValueAndValidity();

    // var options: ModalOptions = {      
    //   backdrop : 'static',
    //   keyboard : false,
    //   ignoreBackdropClick : true
    // }
    // this.openEventModal.config = options;
    this.openEventModal.show();
    this.openEventModal.dismissReason = 'backdrop-click';
    // this.openEventModal.config = options;
    // this.openEventModal.config.ignoreBackdropClick = true;
    // this.openEventModal.config.backdrop = 'static';
    //this.modalService.config = options;
    //this.modalService.show(this.openEventModal, options);

  }
  public updateBooking(content: object) 
  { 
    var fd = new FormData();
    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      var msg = "";
      if (this.simpleForm.controls['bookingName'].invalid)
      {
        msg = "booking Name is not valid."
      }
      else if (this.simpleForm.controls['bookingMobile'].invalid)
      {
        msg = "booking mobile is not valid."
      }
      else if (this.simpleForm.controls['bookingDate'].invalid)
      {
        msg = "bookingDate not valid"
      }
      else if (this.simpleForm.controls['bookingStartTime'].invalid)
      {
        msg = "Invalid bookingStartTime"
      }
      else if (this.simpleForm.controls['bookingEndTime'].invalid)
      {
        msg = "Invalid bookingEndTime"
      }
      else
      {
        msg = 'An error has occured, please check missing fields and try again';
      }
      this.toastr.warning(msg, "Error");
      this.toastr.warning("Check Invalid Fields: " + this.findInvalidControls(), "Error");
      //this.showError("Check Invalid Fields: " + this.findInvalidControls());
      return;
    }
    console.log("this.f['court'].value" + this.f['court'].value);
    if (this.f['court'].value == 'null' || this.f['court'].value == 0 || this.f['court'].value == null)
    {
      msg = "Please select a court";
      this.toastr.warning(msg, "Error");
      return;
    }

    var bookingAddons;
    var newAddons;
    // if (this.bookingAddonsArray.length > 0)
    // {
    //   if (this.existingBookingAddonArray != null)
    //   {
    //     if (this.existingBookingAddonArray.length > 0)
    //     {
    //       newAddons = this.bookingAddonsArray.filter(item => this.existingBookingAddonArray.indexOf(item) < 0);
    //       bookingAddons = newAddons;
    //       //this.bookingAddon = this.bookingAddonsArray;
    //     }
    //     else
    //     {
    //       bookingAddons = this.bookingAddonsArray;
    //     }
    //   }
    //   else
    //   {
    //     bookingAddons = this.bookingAddonsArray;
    //   }
    // }
    bookingAddons = this.bookingAddonsArray;

    console.log('this.bookingAddonsArray.length' + this.bookingAddonsArray.length);
    //console.log('this.existingBookingAddonArray.length' + this.existingBookingAddonArray.length);
    console.log('newAddons' + newAddons);
    console.log('bookingAddons' + bookingAddons);


    bookingAddons = JSON.stringify(bookingAddons)

    //this.existingBookingAddonArray = this.bookingAddonsArray;
    
    // TODO: Use EventEmitter with form value
    this.court = this.f['court'].value
    this.paymentMethod = this.f['paymentMethod'].value
    this.bookingName = this.f['bookingName'].value
    this.bookingMobile = this.f['bookingMobile'].value
    this.bookingCountryCode = this.f['bookingCountryCode'].value
    this.bookingDate = this.f['bookingDate'].value
    this.bookingStartTime = this.f['bookingStartTime'].value
    this.bookingEndTime = this.f['bookingEndTime'].value
    if (this.isUpdate)
    {
      this.bookingPrice = this.f['newBookingPrice'].value
      this.bookingAddon = this.f['newBookingAddon'].value
      this.bookingVAT = this.f['newBookingVAT'].value
      this.bookingTotal = this.f['newBookingTotal'].value
    }
    else
    {
      this.bookingPrice = this.f['bookingPrice'].value
      this.bookingAddon = this.f['bookingAddon'].value
      this.bookingVAT = this.f['bookingVAT'].value
      this.bookingTotal = this.f['bookingTotal'].value
    }
    this.bookingReOccurDays = this.f['bookingReOccurDays'].value
    this.bookingReOccurInstance = this.f['bookingReOccurInstance'].value
    this.bookingTotalWithReoocur = this.f['bookingTotalWithReoocur'].value
    this.totalRemainingAmount = this.f['totalRemainingAmount'].value

    let formattedDate = (moment(new Date(this.f['bookingDate'].value))).format('YYYY-MM-DD')

    let startTimeDT = new Date(this.bookingStartTime);
    let endTimeDT = new Date(this.bookingEndTime)
    let formattedStartTime = startTimeDT.toTimeString().toString().substr(0, 8);
    let formattedEndTime = endTimeDT.toTimeString().toString().substr(0, 8);

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = (endTimeDT.getTime() - startTimeDT.getTime())/60000;
    console.log("duration__" + duration)
    console.log("formattedDate" + formattedDate);

    var mobileCheck = /^\d+$/.test(this.bookingMobile);

    if (duration > 120)
    {
      this.toastr.error('Booking duration cannot exceed 120 minutes', "Error");
      return;
    }
    else if (duration == 0)
    {
      this.toastr.error('Booking start/end time cannot be on same time', "Error");
      return;
    }
    else if (this.bookingMobile.length < 8)
    {
      this.toastr.error('Mobile Number is below valid length', "Error");
      return;
    }
    else if (this.bookingMobile.length > 8)
    {
      this.toastr.error('Mobile Number exceeds valid length', "Error");
      return;
    }
    else if (!mobileCheck)
    {
      this.toastr.error('Mobile Number is invalid', "Error");
      return;
    }

    var startDate = formattedDate + ' ' + formattedStartTime;
    var endTime = formattedDate + ' ' + formattedEndTime;

    var dbFunction = '';
    if (this.isUpdate && !this.isReoccur)
    {
      dbFunction = 'updateBookingCalendar';
      fd.append('bookingId',this.bookingId);
      //fd.append('facilityId',this.facilityId);
    }
    else if (this.isUpdate && this.isReoccur)
    {
      dbFunction = 'updateBookingCalendar';
      fd.append('bookingId',this.bookingId);
      fd.append('bookingReOccurInstance',this.bookingReOccurInstance);
      fd.append('bookingTotalWithReoocur',this.bookingTotalWithReoocur);
      fd.append('bookingReoccurStartTime',formattedStartTime);
      fd.append('bookingReoccurEndTime',formattedEndTime);
    }
    else if (!this.isUpdate && this.isReoccur)
    {
      dbFunction = 'addBookingCalendar';
      //fd.append('userId',this.userId);
      //fd.append('facilityId',this.facilityId);
      fd.append('channel','Backoffice');
      fd.append('bookingReOccurInstance',this.bookingReOccurInstance);
      fd.append('bookingTotalWithReoocur',this.bookingTotalWithReoocur);
      fd.append('bookingReoccurStartTime',formattedStartTime);
      fd.append('bookingReoccurEndTime',formattedEndTime);
    }
    else if (!this.isUpdate)
    {
      dbFunction = 'addBookingCalendar';
      //fd.append('userId',this.userId);
      fd.append('facilityId',this.facilityId);
      fd.append('channel','Backoffice');
    }

    fd.append('staffId',this.storageSrv.getUser());
    fd.append('facilityId',this.facilityId);
    fd.append('courtId',this.court);
    fd.append('paymentMethodCode',this.paymentMethod);
    fd.append('bookingName',this.bookingName);
    fd.append('bookingMobile',this.bookingMobile);
    fd.append('bookingCountryCode',this.bookingCountryCode);
    fd.append('bookingDate',formattedDate);
    fd.append('bookingStartTime',startDate);
    fd.append('bookingEndTime',endTime);
    fd.append('bookingDuration',duration.toString());
    fd.append('bookingPrice', this.bookingPrice);
    fd.append('bookingAddon', this.bookingAddon);
    fd.append('bookingVAT',this.bookingVAT);
    fd.append('bookingTotal',this.bookingTotal);
    fd.append('isReoccur',String(this.isReoccur));
    fd.append('ccy',this.ccy);
    fd.append('taxPercentage', String(this.taxPercentage*100));
    fd.append('bookingAddonArray',bookingAddons);
    fd.append('totalRemainingAmount',this.totalRemainingAmount.toString());

    console.log('date: ' + formattedDate);
    console.log('startDate: ' + startDate);
    console.log('endTime: ' + endTime);
    console.log('isReoccur: ' + String(this.isReoccur));
    console.log("calendarDate22" + new Date(this.f['bookingDate'].value));


    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.httpService.post(dbFunction, fd, '')
    .then(
      data => 
      {
        if (this.isUpdate) 
        {
          console.log(data);this.showSuccess('Booking updated');
        } 
        else 
        {
          console.log(data);this.showSuccess('Booking added');
        }
      },
      error => 
      {
        if (this.isUpdate) 
        {
          this.isError = true;
          this.toastr.error(error.desc, "Error");
          console.log(error);
        } 
        else 
        {
          this.isError = true;
          this.toastr.error(error.desc, "Error");
          console.log(error);
        }
      },
    ).catch();
  }
  public cancelBooking(content: object) 
  {
    var dbFunction = 'cancelBookingCalendar';

    var fd = new FormData();
    
    this.court = this.f['court'].value

    fd.append('bookingId',this.bookingId);
    fd.append('ownerId',this.ownerId);
    fd.append('facilityId',this.facilityId);
    fd.append('courtId',this.court);

    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.httpService.post(dbFunction, fd, '')
    .then(
      data => 
      {
        console.log(data);this.showSuccess('Booking cancelled');

      },
      error => 
      {
        if (this.isUpdate) 
        {
          this.isError = true;
          this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');
          console.log(error);
        } 
        else 
        {
          this.isError = true;
          this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');
          console.log(error);
        }
      },
    ).catch();
  }
  //Function 1
  public findInvalidControls() 
  {
    const invalid = [];
    const controls = this.simpleForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }
  //Function 2
  get f() 
  { 
    return this.simpleForm.controls; 
  }
  //Function 3
  async showSuccess(msg) {

    await this.toastr.success(msg, 'Success');
    this.delay(1000).then(any=>{
      this.addBookingModal.hide();
      this.openEventModal.hide();
      this.simpleForm.patchValue({bookingName: ''});
      this.closeModal();
      this.ngOnInit();
      //window.location.reload();
    });  
  }
  //Function 4
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
    }
  public updateCalendar()
  {
    const calendarApi = this.calendarComponent?.getApi();
    for(let event of this.disabledData)
    {
      calendarApi?.addEvent(event);
    }
  }
  public closeModal()
  {
    this.simpleForm.patchValue({bookingName: null});
    this.simpleForm.patchValue({bookingMobile: null});
    this.simpleForm.patchValue({bookingCountryCode: null});
    this.simpleForm.patchValue({newBookingPrice: null});
    this.simpleForm.patchValue({newBookingAddon: null});
    this.simpleForm.patchValue({newBookingVAT: null});
    this.simpleForm.patchValue({newBookingTotal: null});
    this.bookingAddonsArray = [];
    if (this.isUpdate)
    {
      this.openEventModal.hide();
    }
    else
    {
      this.addBookingModal.hide();
    }
  }
  public openFullDetails()
  {
    if (this.isUpdate)
    {
      this.openEventModal.hide();
    }
    else
    {
      this.addBookingModal.hide();
    }
  }
  public roundTo = function(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };
  public updateReoccur()
  {
    this.updateReoccurDay();
    var status = this.f['bookingReOccur'].value;
    if (status == true)
    {
      this.bookingReOccur = true;
      //this.f['bookingReOccurDays'].enable();
      this.f['bookingReOccurInstance'].enable();
    }
    else
    {
      this.bookingReOccur = false;
      //this.f['bookingReOccur'].enable();
      this.f['bookingReOccurDays'].disable();
      this.f['bookingReOccurInstance'].disable();
      this.simpleForm.patchValue({bookingReOccurDays: null});
    }

    //console.log('selectedReoccurDay' + this.selectedReoccurDay);
    //this.bookingReOccur = true;
  }
  public updateReoccurDay()
  {
    var selectedDay = (new Date(this.f['bookingDate'].value)).getDay();
    this.selectedReoccurDay = selectedDay;
  }
  public updateDate()
  {
    this.updateReoccurDay();
  }
  public updateReoccurTotal()
  {

  }
  public addAddon()
  {
    if (this.f['bookingAddonInstances'].value != '' && this.f['addon'].value != null)
    {
      var noInstances = parseInt(this.f['bookingAddonInstances'].value);
      var selectedAddon = this.f['addon'].value.split("|");
      console.log('selectedAddon' + JSON.stringify(selectedAddon));

      var price = parseFloat(selectedAddon[2]);
      if (noInstances > 0)
      {
      }
      else
      {
        return;
      }
      var total = noInstances * price;
      this.simpleForm.patchValue({bookingAddon: this.f['bookingAddon'].value + total});

      var isExisting = false;
      this.bookingAddonsArray.forEach(element => {
        if (element.id == selectedAddon[0])
        {
          isExisting = true;
          var index = this.bookingAddonsArray.splice(this.bookingAddonsArray.indexOf(element), 1);
          this.bookingAddonsArray.push({
            id: selectedAddon[0],
            name: selectedAddon[1],
            count: noInstances + element.count,
            price: price
          });
        }
      });

      if (!isExisting)
      {
        this.bookingAddonsArray.push({
          id: selectedAddon[0],
          name: selectedAddon[1],
          count: noInstances,
          price: price
        });
      }

      //this.bookingAddonsArray[0];

      //console.log('total' + total);
      //console.log('noInstances' + noInstances);
      //console.log('price' + price);
    }
    this.updatePriceForAdd();
    this.isAddonBtn = false;
    this.simpleForm.patchValue({addon: null});
    this.simpleForm.patchValue({bookingAddonInstances: null, disabled:true});
    this.f['bookingAddonInstances'].disable();
  }
  public updateAddon()
  {
    this.isAddonBtn = true;
    this.f['bookingAddonInstances'].enable();
  }
  public removeAddon(addonId: number)
  {
    this.bookingAddonsArray = this.bookingAddonsArray.filter(({ id }) => id !== addonId); 
    this.updatePriceForAdd();       
  }
  public addAddonForEdit()
  {
    if (this.f['bookingAddonInstances'].value != '' && this.f['addon'].value != null)
    {
      var noInstances = parseInt(this.f['bookingAddonInstances'].value);
      var selectedAddon = this.f['addon'].value.split("|");
      console.log('selectedAddon' + JSON.stringify(selectedAddon));

      var price = parseFloat(selectedAddon[2]);
      if (noInstances > 0)
      {
      }
      else
      {
        return;
      }
      var total = noInstances * price;
      this.simpleForm.patchValue({newBookingAddon: this.f['newBookingAddon'].value + total});
      
      var isExisting = false;

      for (let index = 0; index < this.bookingAddonsArray.length; index++) {
        const element = this.bookingAddonsArray[index];
        if (element.id == selectedAddon[0])
        {
          isExisting = true;
          this.bookingAddonsArray.splice(this.bookingAddonsArray.indexOf(element), 1);
          this.bookingAddonsArray.push({
            id: selectedAddon[0],
            name: selectedAddon[1],
            count: parseInt(element.count.toString()) + parseInt(noInstances.toString()),
            price: price
          });
          break;
        }
      }
      
      if (!isExisting)
      {
        this.bookingAddonsArray.push({
          id: selectedAddon[0],
          name: selectedAddon[1],
          count: noInstances,
          price: price
        });
      }
      // this.bookingAddonsArray.every(element => {
      //   if (element.id == selectedAddon[0])
      //   {
      //     isExisting = true;
      //     var index = this.bookingAddonsArray.splice(this.bookingAddonsArray.indexOf(element), 1);
      //     console.log("noInstances" + noInstances);
      //     console.log("element.count" + element.count);

      //     this.bookingAddonsArray.push({
      //       id: selectedAddon[0],
      //       name: selectedAddon[1],
      //       count: parseInt(element.count.toString()) + parseInt(noInstances.toString()),
      //       price: price
      //     });
      //     return;
      //   }
      // });

      //this.bookingAddonsArray[0];

      //console.log('total' + total);
      //console.log('noInstances' + noInstances);
      //console.log('price' + price);
    }
    this.updatePriceForEdit();
    this.isAddonBtn = false;
    this.simpleForm.patchValue({addon: null});
    this.simpleForm.patchValue({bookingAddonInstances: null, disabled:true});
    this.f['bookingAddonInstances'].disable();
  }
  public updateAddonForEdit()
  {
    this.isAddonBtn = true;
    this.f['bookingAddonInstances'].enable();
  }
  public removeAddonForEdit(addonId: number)
  {
    this.bookingAddonsArray = this.bookingAddonsArray.filter(({ id }) => id !== addonId); 
    this.updatePriceForEdit();       
  }
  public updatePriceForAdd()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.f['bookingStartTime'].value);
    var endDate = new Date(this.f['bookingEndTime'].value);
    this.isReoccur = this.f['bookingReOccur'].value;

    let startTimeDT = new Date(this.f['bookingStartTime'].value);
    let endTimeDT = new Date(this.f['bookingEndTime'].value)

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = (endTimeDT.getTime() - startTimeDT.getTime())/60000;
    console.log("duration__" + duration)


    var reoccurInstances;
    if (this.isReoccur)
    {
      if (this.f['bookingReOccurInstance'].value == '' || this.f['bookingReOccurInstance'].value == null || this.f['bookingReOccurInstance'].value == '0')
      {
        reoccurInstances = 1;
      }
      else
      {
        reoccurInstances = parseInt(this.f['bookingReOccurInstance'].value);
      }
    }


    var existingSubTotalPrice = parseFloat(this.f['bookingPrice'].value);
    var existingAddonPrice = parseFloat(this.f['bookingAddon'].value);
    var existingVATPrice = parseFloat(this.f['bookingVAT'].value);
    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);

    var newSubTotalPrice = 0.0;
    var newAddonPrice = 0.0;
    var newVATPrice = 0.0;
    var newTotalPrice = 0.0;

    // if (this.f['bookingAddon'].value == '')
    // {
    //   addon = 0.0;
    // }
    // else if (parseFloat(this.f['bookingAddon'].value) > 0)
    // {
    //   addon = parseFloat(this.f['bookingAddon'].value);
    // }
    // else
    // {
    //   addon = addonTotalPrice;
    // }

    if (duration == 30)
    {
      this.courtPrice = this.courtPrice30min;
    }
    else if (duration == 60)
    {
      this.courtPrice = this.courtPrice60min;
    }
    else if (duration == 90)
    {
      this.courtPrice = this.courtPrice90min;
    }
    else if (duration == 120)
    {
      this.courtPrice = this.courtPrice120min;
    }
    else
    {
      this.courtPrice = this.courtPrice120min;
    }

    subTotalPrice = this.courtPrice;

    //1
    newSubTotalPrice = this.courtPrice;

    for (let addonItem of this.bookingAddonsArray)
    {
      var addonItemPrice = addonItem.price * addonItem.count;
      addonTotalPrice = addonTotalPrice + addonItemPrice;
    }

    //2
    newAddonPrice = addonTotalPrice;

    //3
    var totalPriceWithAddon = (newSubTotalPrice + newAddonPrice);
    vat = totalPriceWithAddon * this.taxPercentage;
    newVATPrice = vat;

    //4
    newTotalPrice = newSubTotalPrice + newAddonPrice + vat;


    var finalSubTotalPrice = 0.0;
    var finalAddonPrice = 0.0;
    var finalVATPrice = 0.0;
    var finalTotalPrice = 0.0;


    if (this.isReoccur)
    {
      //var subTotalPriceR = subTotalPrice * reoccurInstances;
      //var vatR = vat * reoccurInstances;
      totalReoccur = total * reoccurInstances;
    }

    console.log('duration ' + duration);
    console.log('courtPrice ' + this.courtPrice);
    console.log('subTotalPrice ' + newSubTotalPrice);
    console.log('vat ' + newVATPrice);
    console.log('addon ' + newAddonPrice);
    console.log('total ' + newTotalPrice);
    console.log('totalReoccur ' + totalReoccur);

    this.simpleForm.patchValue({bookingPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({bookingVAT: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingTotal: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});

    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);
    var newTotalPrice = parseFloat(this.f['newBookingTotal'].value);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public updatePriceForAddPrice()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.f['bookingStartTime'].value);
    var endDate = new Date(this.f['bookingEndTime'].value);
    this.isReoccur = this.f['bookingReOccur'].value;

    let startTimeDT = new Date(this.f['bookingStartTime'].value);
    let endTimeDT = new Date(this.f['bookingEndTime'].value)

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = (endTimeDT.getTime() - startTimeDT.getTime())/60000;
    console.log("duration__" + duration)


    var reoccurInstances;
    if (this.isReoccur)
    {
      if (this.f['bookingReOccurInstance'].value == '' || this.f['bookingReOccurInstance'].value == null || this.f['bookingReOccurInstance'].value == '0')
      {
        reoccurInstances = 1;
      }
      else
      {
        reoccurInstances = parseInt(this.f['bookingReOccurInstance'].value);
      }
    }


    var existingSubTotalPrice = parseFloat(this.f['bookingPrice'].value);
    var existingAddonPrice = parseFloat(this.f['bookingAddon'].value);
    var existingVATPrice = parseFloat(this.f['bookingVAT'].value);
    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);

    var newSubTotalPrice = parseFloat(this.f['bookingPrice'].value);
    var newAddonPrice = 0.0;
    var newVATPrice = 0.0;
    var newTotalPrice = 0.0;

    // if (this.f['bookingAddon'].value == '')
    // {
    //   addon = 0.0;
    // }
    // else if (parseFloat(this.f['bookingAddon'].value) > 0)
    // {
    //   addon = parseFloat(this.f['bookingAddon'].value);
    // }
    // else
    // {
    //   addon = addonTotalPrice;
    // }

    if (duration == 30)
    {
      this.courtPrice = this.courtPrice30min;
    }
    else if (duration == 60)
    {
      this.courtPrice = this.courtPrice60min;
    }
    else if (duration == 90)
    {
      this.courtPrice = this.courtPrice90min;
    }
    else if (duration == 120)
    {
      this.courtPrice = this.courtPrice120min;
    }
    else
    {
      this.courtPrice = this.courtPrice120min;
    }

    //subTotalPrice = this.courtPrice;

    //1
    //newSubTotalPrice = this.courtPrice;

    for (let addonItem of this.bookingAddonsArray)
    {
      var addonItemPrice = addonItem.price * addonItem.count;
      addonTotalPrice = addonTotalPrice + addonItemPrice;
    }

    //2
    newAddonPrice = addonTotalPrice;

    //3
    var totalPriceWithAddon = (newSubTotalPrice + newAddonPrice);
    vat = totalPriceWithAddon * this.taxPercentage;
    newVATPrice = vat;

    //4
    newTotalPrice = newSubTotalPrice + newAddonPrice + vat;


    var finalSubTotalPrice = 0.0;
    var finalAddonPrice = 0.0;
    var finalVATPrice = 0.0;
    var finalTotalPrice = 0.0;


    if (this.isReoccur)
    {
      //var subTotalPriceR = subTotalPrice * reoccurInstances;
      //var vatR = vat * reoccurInstances;
      totalReoccur = total * reoccurInstances;
    }

    console.log('duration ' + duration);
    console.log('courtPrice ' + this.courtPrice);
    console.log('subTotalPrice ' + newSubTotalPrice);
    console.log('vat ' + newVATPrice);
    console.log('addon ' + newAddonPrice);
    console.log('total ' + newTotalPrice);
    console.log('totalReoccur ' + totalReoccur);

    //this.simpleForm.patchValue({bookingPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({bookingVAT: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingTotal: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});

    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);
    var newTotalPrice = parseFloat(this.f['newBookingTotal'].value);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public updatePriceForEditPrice()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.f['bookingStartTime'].value);
    var endDate = new Date(this.f['bookingEndTime'].value);
    this.isReoccur = this.f['bookingReOccur'].value;

    
    let startTimeDT = new Date(this.f['bookingStartTime'].value);
    let endTimeDT = new Date(this.f['bookingEndTime'].value)

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = (endTimeDT.getTime() - startTimeDT.getTime())/60000;
    console.log("duration__" + duration)

    // if (duration > 120)
    // {
    //   var minutesToAdd=30;
    //   var futureDate = new Date(startDate.getTime() + minutesToAdd*60000);
    //   this.simpleForm.patchValue({bookingStartTime: futureDate});
    // }

    //FOR TESTING TO BE REMOVED
    //this.isReoccur = false;

    var reoccurInstances;
    if (this.isReoccur)
    {
      if (this.f['bookingReOccurInstance'].value == '' || this.f['bookingReOccurInstance'].value == null || this.f['bookingReOccurInstance'].value == '0')
      {
        reoccurInstances = 1;
      }
      else
      {
        reoccurInstances = parseInt(this.f['bookingReOccurInstance'].value);
      }
    }


    var existingSubTotalPrice = parseFloat(this.f['bookingPrice'].value);
    var existingAddonPrice = parseFloat(this.f['bookingAddon'].value);
    var existingVATPrice = parseFloat(this.f['bookingVAT'].value);
    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);

    var newSubTotalPrice = parseFloat(this.f['newBookingPrice'].value);
    var newAddonPrice = 0.0;
    var newVATPrice = 0.0;
    var newTotalPrice = 0.0;

    if (duration == 30)
    {
      this.courtPrice = this.courtPrice30min;
    }
    else if (duration == 60)
    {
      this.courtPrice = this.courtPrice60min;
    }
    else if (duration == 90)
    {
      this.courtPrice = this.courtPrice90min;
    }
    else if (duration == 120)
    {
      this.courtPrice = this.courtPrice120min;
    }
    else
    {
      this.courtPrice = this.courtPrice120min;
    }

    subTotalPrice = this.courtPrice;

    //1
    //newSubTotalPrice = this.courtPrice;

    if (this.bookingAddonsArray.length > 0)
    {
      if (this.existingBookingAddonArray != null)
      {
        if (this.bookingAddonsArray.length >= this.existingBookingAddonArray.length)
        {
          for (let addonItem of this.bookingAddonsArray)
          {
            var addonItemPrice = addonItem.price * addonItem.count;
            addonTotalPrice = addonTotalPrice + addonItemPrice;
          }
          newAddonPrice = addonTotalPrice;
        }
        else if (this.bookingAddonsArray.length < this.existingBookingAddonArray.length)
        {
          for (let addonItem of this.bookingAddonsArray)
          {
            var addonItemPrice = addonItem.price * addonItem.count;
            addonTotalPrice = addonTotalPrice - addonItemPrice;
          }
          newAddonPrice = addonTotalPrice * -1;
        }
        else
        {
          newAddonPrice = existingAddonPrice;
        }
      }
      else
      {
        newAddonPrice = existingAddonPrice;
      }
    }
    else if (this.bookingAddonsArray.length == 0)
    {
      newAddonPrice = 0;
    }
    else
    {
      newAddonPrice = existingAddonPrice;
    }


    console.log('addonTotalPrice ' + addonTotalPrice);
    console.log('existingAddonPrice ' + existingAddonPrice);

    //2

    //3
    var totalPriceWithAddon = (newSubTotalPrice + newAddonPrice);
    vat = totalPriceWithAddon * this.taxPercentage;
    newVATPrice = vat;

    //4
    newTotalPrice = newSubTotalPrice + newAddonPrice + newVATPrice;


    var finalSubTotalPrice = 0.0;
    var finalAddonPrice = 0.0;
    var finalVATPrice = 0.0;
    var finalTotalPrice = 0.0;
    

    // if (this.f['bookingVAT'].value == '')
    // {
    //   vat = 0.0;
    // }
    // else if (parseFloat(this.f['bookingVAT'].value) > 0)
    // {
    //   vat = parseFloat(this.f['bookingVAT'].value);
    // }
    // else
    // {
    //   addon = addonTotalPrice;
    // }

    //var totalPriceWithAddon = (subTotalPrice + addonTotalPrice);
    //vat = totalPriceWithAddon * this.taxPercentage;
    //var totalPriceWithVAT = totalPriceWithAddon + vat;
    //total = totalPriceWithVAT;

    //vat = (subTotalPrice + addon) * 0.05;
    //total = subTotalPrice + addon + vat;

    if (this.isReoccur)
    {
      //var subTotalPriceR = subTotalPrice * reoccurInstances;
      //var vatR = vat * reoccurInstances;
      totalReoccur = total * reoccurInstances;
    }

    console.log('duration ' + duration);
    console.log('courtPrice ' + this.courtPrice);
    console.log('this.taxPercentage ' + this.taxPercentage);
    console.log('newSubTotalPrice ' + newSubTotalPrice);
    console.log('newVATPrice ' + newVATPrice);
    console.log('newAddonPrice ' + newAddonPrice);
    console.log('newTotalPrice ' + newTotalPrice);
    console.log('totalReoccur ' + totalReoccur);

    //this.simpleForm.patchValue({newBookingPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({newBookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({newBookingVAT: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({newBookingTotal: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});

    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);
    var newTotalPrice = parseFloat(this.f['newBookingTotal'].value);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public updatePriceForEdit()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.f['bookingStartTime'].value);
    var endDate = new Date(this.f['bookingEndTime'].value);
    this.isReoccur = this.f['bookingReOccur'].value;

    
    let startTimeDT = new Date(this.f['bookingStartTime'].value);
    let endTimeDT = new Date(this.f['bookingEndTime'].value)

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = (endTimeDT.getTime() - startTimeDT.getTime())/60000;
    console.log("duration__" + duration)

    // if (duration > 120)
    // {
    //   var minutesToAdd=30;
    //   var futureDate = new Date(startDate.getTime() + minutesToAdd*60000);
    //   this.simpleForm.patchValue({bookingStartTime: futureDate});
    // }

    //FOR TESTING TO BE REMOVED
    //this.isReoccur = false;

    var reoccurInstances;
    if (this.isReoccur)
    {
      if (this.f['bookingReOccurInstance'].value == '' || this.f['bookingReOccurInstance'].value == null || this.f['bookingReOccurInstance'].value == '0')
      {
        reoccurInstances = 1;
      }
      else
      {
        reoccurInstances = parseInt(this.f['bookingReOccurInstance'].value);
      }
    }


    var existingSubTotalPrice = parseFloat(this.f['bookingPrice'].value);
    var existingAddonPrice = parseFloat(this.f['bookingAddon'].value);
    var existingVATPrice = parseFloat(this.f['bookingVAT'].value);
    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);

    var newSubTotalPrice = 0.0;
    var newAddonPrice = 0.0;
    var newVATPrice = 0.0;
    var newTotalPrice = 0.0;

    if (duration == 30)
    {
      this.courtPrice = this.courtPrice30min;
    }
    else if (duration == 60)
    {
      this.courtPrice = this.courtPrice60min;
    }
    else if (duration == 90)
    {
      this.courtPrice = this.courtPrice90min;
    }
    else if (duration == 120)
    {
      this.courtPrice = this.courtPrice120min;
    }
    else
    {
      this.courtPrice = this.courtPrice120min;
    }

    subTotalPrice = this.courtPrice;

    //1
    newSubTotalPrice = this.courtPrice;

    if (this.bookingAddonsArray.length > 0)
    {
      if (this.existingBookingAddonArray != null)
      {
        if (this.bookingAddonsArray.length >= this.existingBookingAddonArray.length)
        {
          for (let addonItem of this.bookingAddonsArray)
          {
            var addonItemPrice = addonItem.price * addonItem.count;
            addonTotalPrice = addonTotalPrice + addonItemPrice;
          }
          newAddonPrice = addonTotalPrice;
        }
        else if (this.bookingAddonsArray.length < this.existingBookingAddonArray.length)
        {
          for (let addonItem of this.bookingAddonsArray)
          {
            var addonItemPrice = addonItem.price * addonItem.count;
            addonTotalPrice = addonTotalPrice - addonItemPrice;
          }
          newAddonPrice = addonTotalPrice * -1;
        }
        else
        {
          newAddonPrice = existingAddonPrice;
        }
      }
      else
      {
        newAddonPrice = existingAddonPrice;
      }
    }
    else if (this.bookingAddonsArray.length == 0)
    {
      newAddonPrice = 0;
    }
    else
    {
      newAddonPrice = existingAddonPrice;
    }


    console.log('addonTotalPrice ' + addonTotalPrice);
    console.log('existingAddonPrice ' + existingAddonPrice);

    //2

    //3
    var totalPriceWithAddon = (newSubTotalPrice + newAddonPrice);
    vat = totalPriceWithAddon * this.taxPercentage;
    newVATPrice = vat;

    //4
    newTotalPrice = newSubTotalPrice + newAddonPrice + newVATPrice;


    var finalSubTotalPrice = 0.0;
    var finalAddonPrice = 0.0;
    var finalVATPrice = 0.0;
    var finalTotalPrice = 0.0;
    

    // if (this.f['bookingVAT'].value == '')
    // {
    //   vat = 0.0;
    // }
    // else if (parseFloat(this.f['bookingVAT'].value) > 0)
    // {
    //   vat = parseFloat(this.f['bookingVAT'].value);
    // }
    // else
    // {
    //   addon = addonTotalPrice;
    // }

    //var totalPriceWithAddon = (subTotalPrice + addonTotalPrice);
    //vat = totalPriceWithAddon * this.taxPercentage;
    //var totalPriceWithVAT = totalPriceWithAddon + vat;
    //total = totalPriceWithVAT;

    //vat = (subTotalPrice + addon) * 0.05;
    //total = subTotalPrice + addon + vat;

    if (this.isReoccur)
    {
      //var subTotalPriceR = subTotalPrice * reoccurInstances;
      //var vatR = vat * reoccurInstances;
      totalReoccur = total * reoccurInstances;
    }

    console.log('duration ' + duration);
    console.log('courtPrice ' + this.courtPrice);
    console.log('this.taxPercentage ' + this.taxPercentage);
    console.log('newSubTotalPrice ' + newSubTotalPrice);
    console.log('newVATPrice ' + newVATPrice);
    console.log('newAddonPrice ' + newAddonPrice);
    console.log('newTotalPrice ' + newTotalPrice);
    console.log('totalReoccur ' + totalReoccur);

    this.simpleForm.patchValue({newBookingPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({newBookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({newBookingVAT: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({newBookingTotal: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});

    var existingTotalPrice = parseFloat(this.f['bookingTotal'].value);
    var newTotalPrice = parseFloat(this.f['newBookingTotal'].value);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public goFullDetails(bookingId) {
    this.router.navigate(['/booking/details'], {state: {bookingId: bookingId}, relativeTo: this.route});
  }
}
