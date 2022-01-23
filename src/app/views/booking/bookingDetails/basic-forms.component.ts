import { Component, Input, ViewEncapsulation, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
//import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { ValidationFormsService } from './validation-forms.service';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToasterComponent, ToasterPosition } from '@coreui/angular';
import { AppToastComponent as ToastComp } from '../../../services/shared-service/toast-simple/toast.component'
import { HttpService } from '../../../services/http-service/http.service'
import { ModalDirective } from 'ngx-bootstrap/modal';

import { LocalInterfaceService } from '../../../services/local-inteface-service/local-interface.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/storege-service/storage.service';
import { ValidationService } from '../../../services/validation-service/validation.service';
import * as moment from 'moment';

@Component({
  //selector: 'app-toasters',
  templateUrl: 'basic-forms.component.html',
  styleUrls: ["../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",],
  //encapsulation: ViewEncapsulation.None,
  providers: [ ValidationFormsService ]
})


export class BasicFormsComponent {


  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2022, 9, 15);

  bsValue: Date = new Date();

// Timepicker

  public isEnabled: boolean = true;


  public mfData? : object = {};
  public trnData?;
  public resData? : object = {};
  public courts?;
  public users?;
  public paymentMethods?;
  isUpdate: boolean = false;
  dbFunction?: string;
  customerName: string;
  customerMobile: string;
  customerCountryCode: string;
  startTime;
  endTime;
  subTotalPrice: string;
  addon: string;
  bookingAddon: string;
  tax: string;
  totalPrice: string;
  paidAmount: string;
  ccy: string;
  paymentStatus: string;
  notes: string;
  paidDate: Date;
  isReoccur: string;
  cancelled: string;
  cancelledDate: Date;
  imageUrl: string;
  brouchureUrl: string;
  uploadedImage: File;
  uploadedBrochure: File;
  court?: string;
  userId?: string;
  bookingId: string;
  channel?: string;
  facilityId: string;
  paidOfflineAmount: string;
  public bookingAddonsArray?:Array<{id: number, name: String, count: number, price: number}> = [];
  public bookingAddons?;
  public bookingAddonInstances?;

  public bookingReOccur: boolean = false;
  public bookingReOccurDays;
  public bookingReOccurInstance;
  public bookingTotalWithReoocur;
  public courtPrice;
  public selectedReoccurDay;

  public bookingDate;

  public courtPrice30min = 0.0;
  public courtPrice60min = 0.0;
  public courtPrice90min = 0.0;
  public courtPrice120min = 0.0;
  public taxPercentage = 0;
  public existingBookingAddonArray;
  paymentMethod?: string;
  public selectedPaymentMethod;
  isAddonBtn: boolean = false;
  isError: boolean = false;
  formChanged: boolean = false;
  public selectedId?;
  totalRemainingAmount = 0.0

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;
  public isLoading: boolean = true;
  //private toasterService: ToasterService;
  //public toasterconfig: ToasterConfig = new ToasterConfig({tapToDismiss: true, timeout: 5000});
  
  @ViewChild(ToastComp) toastComp: ToastComp;
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;
  @ViewChild('addNewPaymentModal', {static: false}) public addNewPaymentModal: ModalDirective;

  public paddingStyle: Object = { 'padding-right': '20px'};
  public initialValue?;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public vf: ValidationFormsService, 
    public httpService: HttpService,
    private localInterfaceSrv: LocalInterfaceService,
    private toastr: ToastrService,
    private storageSrv: StorageService,
    private validationSrv : ValidationService,
    ) {
    //if (localStorage.getItem('currentUser') === null) {this.router.navigateByUrl('/login');}
    if (localStorage.getItem('lang') === "ar") {
      //this.toasterconfig = new ToasterConfig({tapToDismiss: true, timeout: 5000, positionClass: 'toast-top-left'});
    }
    //this.toasterService = toasterService;
    this.formErrors = this.vf.errorMessages;

    if(this.router.getCurrentNavigation().extras.state?.createData == null)
    {
      this.isUpdate = true;
      this.dbFunction = 'updateBookingTable';

      if (this.router.getCurrentNavigation().extras.state?.data != null)
      {
        this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      }
      else if (this.router.getCurrentNavigation().extras.state?.bookingId != null)
      {
        var calBookingId = this.router.getCurrentNavigation().extras.state?.bookingId;
        this.route.queryParams.subscribe(async params => {
          console.log("calBookingId" + calBookingId);
          await this.loadBookingsById(calBookingId);
          this.mfData = this.resData;
          await this.ngOnInit();
        });

      }
      else
      {
        this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      }
      this.bookingId = this.mfData['id'];
      this.court = this.mfData['courtId'];
      this.channel = this.mfData['channel'];
      this.customerName = this.mfData['customerName'];
      this.customerMobile = this.mfData['customerMobile'];
      this.customerCountryCode = this.mfData['customerCountryCode'];
      this.startTime = this.mfData['startTime'];
      this.endTime = this.mfData['endTime'];
      this.subTotalPrice = this.mfData['subTotalPrice'];
      this.bookingAddon = this.mfData['addOn'] == null ? '0' : this.mfData['addOn'];
      this.tax = this.mfData['taxPrice'];
      this.totalPrice = this.mfData['totalPrice'];
      this.paidAmount = this.mfData['paidAmount'];
      this.ccy = this.storageSrv.getFacilityCcy();
      this.notes = this.mfData['notes'] != null ? this.mfData['notes'] : '';
      // this.paymentMethod = this.mfData['paymentMethod'] == null ? null : this.mfData['paymentMethod'];
      this.paymentMethod = null;
      this.taxPercentage = this.mfData['taxPercentage']/100;
      this.paymentStatus = this.mfData['paymentStatus'];
      this.paidDate = this.mfData['paidDate'] != null ? new Date(this.mfData['paidDate']) : this.mfData['paidDate'];
      this.isReoccur = this.mfData['isReoccur'];
      this.cancelled = this.mfData['cancelled'];
      this.cancelledDate = this.mfData['cancelledDate'] == null ? null : new Date(this.mfData['cancelledDate']);
      this.bookingDate = this.mfData['startTime'] != null ? new Date(this.mfData['startTime']) : this.mfData['startTime'];
      this.bookingAddonsArray = this.mfData["addons"];
      this.existingBookingAddonArray = this.bookingAddonsArray != null ? [...this.bookingAddonsArray] : [];
      this.trnData = this.mfData["transactions"];
      this.paidOfflineAmount = '';
      this.totalRemainingAmount = this.roundTo(parseFloat(this.totalPrice) - parseFloat(this.paidAmount), 3);
    }
    else
    {
      this.dbFunction = '/addBooking';
      this.court = this.court == null ? null : this.court;
      //this.user = null;
      this.channel = null;
      this.customerName = '';
      this.customerMobile = '';
      this.customerCountryCode = '973';
      this.startTime = '';
      this.endTime = '';
      this.subTotalPrice = '';
      this.addon = '';
      this.tax = '';
      this.notes = '';
      this.totalPrice = '';
      this.paidAmount = '';
      this.ccy = this.storageSrv.getFacilityCcy();
      this.paymentStatus = '';
      this.paidDate = null;
      this.isReoccur = '0';
      this.cancelled = '0';
      this.paymentMethod = null;
      this.cancelledDate = new Date();
      this.bookingDate = null;
      this.bookingAddon = '0';
      this.bookingAddonsArray = [];
      this.existingBookingAddonArray = [];
      this.paidOfflineAmount = '';
    }
    this.simpleForm = this.fb.group({});
  }


  ngOnInit(): void {
    this.validationSrv.validateAcess()
    .then(async () => {
      this.isLoading = true;
      this.route.queryParams.subscribe(async params => {
        console.log("paidOfflineAmountBeofre" + this.paidOfflineAmount);
        this.facilityId = this.storageSrv.getFacilityId();
        await this.loadCourts(this.facilityId);
        //await this.getUsers();
        await this.updateCourtId(this.court);
        await this.loadAddons(this.facilityId);
        await this.loadPaymentMethods(this.facilityId);
        await this.createForm();
        console.log("paidOfflineAmountAfter" + this.paidOfflineAmount);
        this.initialValue = this.simpleForm?.value;
        this.simpleForm.valueChanges.subscribe(value => {
          this.formChanged = Object.keys(this.initialValue).some(key => this.simpleForm.value[key] != 
                            this.initialValue[key])
        });
      });
    });
  }
  
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  @Input() message : string;
  messages: string[] = [];
  updatedData = this.mfData;

  // Validators.pattern('^[0-9]{4}[\/][1-9]|1[012][\/][0-9]{2}$')]
  createForm() {
    this.simpleForm = this.fb.group({
      court: [this.court, [Validators.required]],
      //user: [this.user, [Validators.required]],
      addon: [this.addon],
      paymentMethod: [this.paymentMethod,],
      paidOfflineAmount: [this.paidOfflineAmount],
      totalRemainingAmount: {value: this.totalRemainingAmount, disabled:true},
      customerName: [this.customerName, [Validators.required]],
      customerMobile: [this.customerMobile, [Validators.required]],
      customerCountryCode: [this.customerCountryCode, [Validators.required]],
      startTime: [this.startTime],
      endTime: [this.endTime],
      bookingDate: [this.bookingDate, [Validators.required]],
      subTotalPrice:{value: this.subTotalPrice, disabled:this.isUpdate ? true : false},
      bookingAddon: {value: this.bookingAddon, disabled:true},
      tax:  {value: this.tax, disabled:true},
      totalPrice: {value: this.totalPrice, disabled:true},
      newBookingPrice: {value: this.subTotalPrice, disabled:this.isUpdate ? false : true },
      newBookingAddon: {value: this.bookingAddon, disabled:true},
      newBookingVAT: {value: this.tax, disabled:true},
      newBookingTotal: {value: this.totalPrice, disabled:true},
      paidAmount: {value: this.paidAmount, disabled:true},
      ccy: {value: this.ccy, disabled:true},
      paymentStatus: {value: this.paymentStatus, disabled:true},
      paidDate: {value: this.paidDate, disabled:true},
      isReoccur: [this.isReoccur],
      notes:  [this.notes],
      cancelled: [this.cancelled],
      cancelledDate: [this.cancelledDate],
      //bookingAddon: {value: this.bookingAddon},
      bookingAddonInstances: {value: this.bookingAddonInstances, disabled:true},
      bookingReOccur: {value: this.bookingReOccur},
      bookingReOccurDays: {value: this.bookingReOccurDays, disabled:true},
      bookingReOccurInstance: {value: this.bookingReOccurInstance, disabled:true},
      bookingTotalWithReoocur: {value: this.bookingTotalWithReoocur, disabled:true},
    }, { });
  }
  get f() 
  { 

      return this.simpleForm.controls;
    
  }


  async showSuccess(msg) {

    await this.toastr.success(msg, 'Success');

    if (this.isUpdate && !this.isError)
    {
      this.ngOnInit();
      // this.delay(2000).then(any=>{
      //   this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
      //     //window.location.reload();
      //   });;
      // });  
    }
    else if (!this.isUpdate && this.isError == false)
    {
      // this.delay(2000).then(any=>{
      //   this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
      //     //window.location.reload();
      //   });;
      // });  
    }
  }

  showError(msg) {
    //this.toasterService.pop('error', 'Error', msg);
  }

  uploadFile(event) {
    let files = event.target.files;
    const reader = new FileReader();
    if (files.length > 0) {
      this.uploadedImage = files[0]; // You will see the file
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { 
        this.imageUrl = reader.result.toString().replace('../padel/', ''); 
    }
    }

  }
  uploadFileBrochure(event) {
    let files = event.target.files;
    const reader = new FileReader();
    if (files.length > 0) {
      this.uploadedBrochure = files[0]; // You will see the file
      reader.readAsDataURL(this.uploadedBrochure);
      reader.onload = (_event) => { 
        this.brouchureUrl = reader.result.toString().replace('../padel/', ''); 
    }
    }

  }
  public showPayment()
  {
    //this.router.navigate(['facility'], {state: {data: ''}, relativeTo: this.route});
    // if (this.editFlag == true)
    // {
    //   this.editFlag = false;
    // }
    // if (this.editFlag == false)
    // {
    //   this.editFlag = true;
    // }
    // this.myDivRef.nativeElement.scrollIntoView({behavior: "smooth", block: "start" });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.simpleForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}


  onCreateGroupFormValueChange(){
  this.simpleForm.valueChanges.subscribe(value => {
    this.formChanged = Object.keys(this.initialValue).some(key => this.simpleForm.value[key] != 
                      this.initialValue[key])
  });
  } 
  updateSelectedPayment(value)
  {
    this.selectedPaymentMethod = value;
  }
  public updateBooking() 
  {
    this.onCreateGroupFormValueChange();

    var totalPaymentPrice = 0.0;
    var fd = new FormData();
    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      var msg = "";
      if (this.simpleForm.controls['customerName'].invalid)
      {
        msg = "booking name is not valid."
      }
      else if (this.simpleForm.controls['customerMobile'].invalid)
      {
        msg = "booking mobile is not valid."
      }
      else if (this.simpleForm.controls['bookingDate'].invalid)
      {
        msg = "bookingDate not valid"
      }
      else if (this.simpleForm.controls['startTime'].invalid)
      {
        msg = "Invalid bookingStartTime"
      }
      else if (this.simpleForm.controls['endTime'].invalid)
      {
        msg = "Invalid bookingEndTime"
      }
      else
      {
        msg = 'An error has occured, please check missing fields and try again';
      }
      this.toastr.warning(msg, "Warning");
      this.toastr.warning("Check Invalid Fields: " + this.findInvalidControls(), "Warning");
      //this.showError("Check Invalid Fields: " + this.findInvalidControls());
      return;
    }

    var bookingAddons;
    var newAddons;
    var addonsUpdated = false;

    if (this.bookingAddonsArray.length != this.existingBookingAddonArray.length)
    {
      addonsUpdated = true;
    }

    bookingAddons = this.bookingAddonsArray;


    // if (!bookingAddons.every(x => this.existingBookingAddonArray.includes(x)))
    // {
    //   addonsUpdated = true;
    // }
    //this.simpleForm.markAsDirty();
    console.log("this.simpleForm.dirty" + this.simpleForm.dirty);
    console.log("this.formChanged" + this.formChanged);
    console.log("this.addonsUpdatedy" + addonsUpdated);
    if (!this.simpleForm.dirty && !this.formChanged)
    {
      msg = "No changes made to be saved1";
      this.toastr.warning(msg, "Warning");
      return;
    }

    console.log('this.bookingAddonsArray.length' + this.bookingAddonsArray.length);
    //console.log('this.existingBookingAddonArray.length' + this.existingBookingAddonArray.length);
    console.log('newAddons' + newAddons);
    console.log('bookingAddons' + bookingAddons);


    bookingAddons = JSON.stringify(bookingAddons)

    //this.existingBookingAddonArray = this.bookingAddonsArray;
    
    // TODO: Use EventEmitter with form value
    this.court = this.f['court'].value
    this.customerName = this.f['customerName'].value
    this.customerMobile = this.f['customerMobile'].value
    this.customerCountryCode = this.f['customerCountryCode'].value
    this.notes = this.f['notes'].value
    this.bookingDate = this.f['bookingDate'].value
    this.startTime = this.f['startTime'].value
    this.endTime = this.f['endTime'].value
    if (this.isUpdate)
    {
      this.subTotalPrice = this.f['newBookingPrice'].value
      this.bookingAddon = this.f['newBookingAddon'].value
      this.tax = this.f['newBookingVAT'].value
      this.totalPrice = this.f['newBookingTotal'].value
      totalPaymentPrice = parseFloat(this.totalPrice) - parseFloat(this.f['totalPrice'].value);
    }
    else
    {
      this.subTotalPrice = this.f['subTotalPrice'].value
      this.bookingAddon = this.f['bookingAddon'].value
      this.tax = this.f['tax'].value
      this.totalPrice = this.f['totalPrice'].value
    }
    this.bookingReOccurDays = this.f['bookingReOccurDays'].value
    this.bookingReOccurInstance = this.f['bookingReOccurInstance'].value
    this.bookingTotalWithReoocur = this.f['bookingTotalWithReoocur'].value
    this.totalRemainingAmount = this.f['totalRemainingAmount'].value

    let formattedDate = (moment(new Date(this.f['bookingDate'].value))).format('YYYY-MM-DD')

    //let formattedDate = new Date(this.bookingDate).toISOString().toString().substr(0, 10);

    let startTimeDT = new Date(this.startTime);
    let endTimeDT = new Date(this.endTime)
    let formattedStartTime = startTimeDT.toTimeString().toString().substr(0, 8);
    let formattedEndTime = endTimeDT.toTimeString().toString().substr(0, 8);

    if (endTimeDT < startTimeDT) {
      endTimeDT.setDate(endTimeDT.getDate() + 1);
      }  

    const duration = this.roundTo((endTimeDT.getTime() - startTimeDT.getTime())/60000, 0);
    console.log("duration__" + duration)

    var mobileCheck = /^\d+$/.test(this.customerMobile);
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
    else if (duration < 0)
    {
      this.toastr.error('Booking end time cannot be before start time', "Error");
      return;
    }
    else if (this.customerMobile.length < 8)
    {
      this.toastr.error('Mobile Number is below valid length', "Error");
      return;
    }
    else if (this.customerMobile.length > 8)
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
      fd.append('bookingReOccurInstance',this.bookingReOccurInstance);
      fd.append('bookingTotalWithReoocur',this.bookingTotalWithReoocur);
      fd.append('bookingReoccurStartTime',formattedStartTime);
      fd.append('bookingReoccurEndTime',formattedEndTime);
      fd.append('bookingId',this.bookingId);
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
      //fd.append('facilityId',this.facilityId);
      fd.append('channel','Backoffice');
    }

    fd.append('staffId',this.storageSrv.getUser());
    fd.append('facilityId',this.facilityId);
    fd.append('courtId',this.court);
    fd.append('paymentMethodCode',this.selectedPaymentMethod);
    fd.append('bookingName',this.customerName);
    fd.append('bookingMobile',this.customerMobile);
    fd.append('bookingCountryCode',this.customerCountryCode);
    fd.append('bookingDate',formattedDate);
    fd.append('bookingStartTime',startDate);
    fd.append('bookingEndTime',endTime);
    fd.append('bookingDuration',duration.toString());
    fd.append('bookingPrice', this.subTotalPrice);
    fd.append('bookingAddon', this.bookingAddon);
    fd.append('bookingVAT',this.tax);
    fd.append('bookingTotal',this.totalPrice);
    fd.append('bookingTotalPayment',this.roundTo(totalPaymentPrice, 3).toString());
    fd.append('notes',this.notes);
    fd.append('isReoccur',String(this.isReoccur));
    fd.append('ccy',this.ccy);
    fd.append('taxPercentage', String(this.taxPercentage*100));
    fd.append('bookingAddonArray',bookingAddons);
    fd.append('totalRemainingAmount',this.totalRemainingAmount.toString());
    

    console.log('date: ' + formattedDate);
    console.log('startDate: ' + startDate);
    console.log('endTime: ' + endTime);
    console.log('bookingPrice: ' + this.subTotalPrice);
    console.log('bookingAddon: ' + this.bookingAddon);
    console.log('bookingVAT: ' + this.tax);
    console.log('bookingTotal: ' + this.totalPrice);
    console.log('isReoccur: ' + String(this.isReoccur));


    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.httpService.post(dbFunction, fd, '')
    .then(
      data => 
      {
        if (this.isUpdate) 
        {
          this.simpleForm.markAsPristine();
          //this.bookingId = data.bo
          this.showSuccess('Booking updated');
        } 
        else 
        {
          this.simpleForm.markAsPristine();
          this.addNewPaymentModal.show();
          this.simpleForm.patchValue({paidOfflineAmount: this.totalPrice});
          this.bookingId = data?.content;
          this.isUpdate = true;
          this.showSuccess('Booking added');
        }
      },
      error => 
      {
        if (this.isUpdate) 
        {
          this.isError = true;
          this.toastr.warning(error.desc, "Error");
          console.log(error);
        } 
        else 
        {
          this.isError = true;
          this.toastr.warning(error.desc, "Error");
          console.log(error);
        }
      },
    ).catch();
  }

  loadCourts = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getCourts(facilityId)
      .then(res => {
        this.courts = res;
        //this.taxPercentage = this.courts.content.taxPercentage/100;
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
      .finally(() => this.isLoading = false);
    });
  }

  loadAddons = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getAddons(facilityId)
      .then(res => {
        this.bookingAddons = res;
        //this.taxPercentage = this.courts.content.taxPercentage/100;
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

  loadBookingsById = (bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getBookingsById(bookingId)
      .then(res => {
        this.resData = res.content;
        this.bookingId = this.resData['id'];
        this.court = this.resData['courtId'];
        this.channel = this.resData['channel'];
        this.customerName = this.resData['customerName'];
        this.customerMobile = this.resData['customerMobile'];
        this.startTime = this.resData['startTime'];
        this.endTime = this.resData['endTime'];
        this.subTotalPrice = this.resData['subTotalPrice'];
        this.bookingAddon = this.resData['addOn'] == null ? '0' : this.resData['addOn'];
        this.tax = this.resData['taxPrice'];
        this.totalPrice = this.resData['totalPrice'];
        this.paidAmount = this.resData['paidAmount'];
        this.ccy = this.storageSrv.getFacilityCcy();
        // this.paymentMethod = this.resData['paymentMethod'] == null ? null : this.resData['paymentMethod'];
        this.paymentMethod = null;
        this.taxPercentage = this.resData['taxPercentage']/100;
        this.paymentStatus = this.resData['paymentStatus'];
        this.paidDate = new Date(this.resData['paidDate']);
        this.isReoccur = this.resData['isReoccur'];
        this.notes = this.resData['notes'];
        this.cancelled = this.resData['cancelled'];
        this.cancelledDate = this.resData['cancelledDate'] == null ? null : new Date(this.resData['cancelledDate']);
        this.bookingDate = this.resData['startTime'] != null ? new Date(this.resData['startTime']) : this.resData['startTime'];
        this.bookingAddonsArray = this.resData["addons"];
        this.trnData = this.resData["transactions"];
        this.paidOfflineAmount = '';
        this.totalRemainingAmount = this.roundTo(parseFloat(this.totalPrice) - parseFloat(this.paidAmount), 3);
        //this.simpleForm.patchValue({court: this.court});
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

  async delay(ms: number) {
    //await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  updateData(name: string): void {
    this.updateData['nameEn'] = name;
  }
 
  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  public addAddonForAdd()
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
            count: parseInt(element.count.toString()) + parseInt(noInstances.toString()),
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
  public updateAddonForAdd()
  {
    this.isAddonBtn = true;
    this.f['bookingAddonInstances'].enable();
  }
  public removeAddonForAdd(addonId: number)
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
  public addAddon()
  {
    if (this.isUpdate)
    {
      this.addAddonForEdit();
    }
    else
    {
      this.addAddonForAdd();
    }
    this.simpleForm.markAsDirty();
  }
  public updateAddon()
  {
    if (this.isUpdate)
    {
      this.updateAddonForEdit();
    }
    else
    {
      this.updateAddonForAdd();
    }  
    this.simpleForm.markAsDirty();
  }
  public removeAddon(addonId: number)
  {
    if (this.isUpdate)
    {
      this.removeAddonForEdit(addonId);
    }
    else
    {
      this.removeAddonForAdd(addonId);
    }   
    this.simpleForm.markAsDirty();  
  }
  public updatePriceForAddPrice()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.simpleForm.controls['startTime'] ? this.f['startTime'].value : '');
    var endDate = new Date(this.simpleForm.controls['endTime'] ? this.f['endTime'].value : '');
    this.isReoccur = this.simpleForm.controls['isReoccur'] ? this.f['isReoccur'].value : '';
    const duration = this.roundTo(((endDate.getTime() - startDate.getTime())/60000),0);

    var reoccurInstances;
    if (this.isReoccur == "1")
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

    var existingSubTotalPrice = parseFloat(this.simpleForm.controls['subTotalPrice'] ? this.f['subTotalPrice'].value : 0);
    var existingAddonPrice = parseFloat(this.simpleForm.controls['bookingAddon'] ? this.f['bookingAddon'].value : 0);
    var existingVATPrice = parseFloat(this.simpleForm.controls['tax'] ? this.f['tax'].value : 0);
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);

    var newSubTotalPrice = parseFloat(this.simpleForm.controls['subTotalPrice'] ? this.f['subTotalPrice'].value : 0);
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
    if (duration == null)
    {
      this.courtPrice = this.courtPrice30min;
    }

    subTotalPrice = this.courtPrice;

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
    

    if (this.isReoccur == "1")
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

    //this.simpleForm.patchValue({subTotalPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({tax: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({totalPrice: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});
  
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);
    var newTotalPrice = parseFloat(this.simpleForm.controls['newBookingTotal'] ? this.f['newBookingTotal'].value : 0);
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
    var startDate = new Date(this.simpleForm.controls['startTime'] ? this.f['startTime'].value : '');
    var endDate = new Date(this.simpleForm.controls['endTime'] ? this.f['endTime'].value : '');
    this.isReoccur = this.simpleForm.controls['isReoccur'] ? this.f['isReoccur'].value : '';
    const duration = (endDate.getTime() - startDate.getTime())/60000;

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


    var existingSubTotalPrice = parseFloat(this.simpleForm.controls['subTotalPrice'] ? this.f['subTotalPrice'].value : 0);
    var existingAddonPrice = parseFloat(this.simpleForm.controls['bookingAddon'] ? this.f['bookingAddon'].value : 0);
    var existingVATPrice = parseFloat(this.simpleForm.controls['tax'] ? this.f['tax'].value : 0);
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);

    var newSubTotalPrice = parseFloat(this.simpleForm.controls['newBookingPrice'] ? this.f['newBookingPrice'].value : 0);
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

    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);
    var newTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['newBookingTotal'].value: 0);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public updatePriceForPrice()
  {
    if (this.isUpdate)
    {
      this.updatePriceForEditPrice();
    }
    else
    {
      this.updatePriceForAddPrice();
    }
    this.simpleForm.markAsDirty();
  }
  public updatePriceForAdd()
  {
    var subTotalPrice;
    var addon;
    var vat;
    var total;
    var totalReoccur;
    var addonTotalPrice = 0.0;
    var startDate = new Date(this.simpleForm.controls['startTime'] ? this.f['startTime'].value : '');
    var endDate = new Date(this.simpleForm.controls['endTime'] ? this.f['endTime'].value : '');
    this.isReoccur = this.simpleForm.controls['isReoccur'] ? this.f['isReoccur'].value : '';
    const duration = this.roundTo(((endDate.getTime() - startDate.getTime())/60000),0);

    var reoccurInstances;
    if (this.isReoccur == "1")
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

    var existingSubTotalPrice = parseFloat(this.simpleForm.controls['subTotalPrice'] ? this.f['subTotalPrice'].value : 0);
    var existingAddonPrice = parseFloat(this.simpleForm.controls['bookingAddon'] ? this.f['bookingAddon'].value : 0);
    var existingVATPrice = parseFloat(this.simpleForm.controls['tax'] ? this.f['tax'].value : 0);
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);

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
    if (duration == null)
    {
      this.courtPrice = this.courtPrice30min;
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
    

    if (this.isReoccur == "1")
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

    this.simpleForm.patchValue({subTotalPrice: this.roundTo(newSubTotalPrice, 3), disabled:true});
    this.simpleForm.patchValue({bookingAddon: this.roundTo(newAddonPrice, 3)});
    this.simpleForm.patchValue({tax: this.roundTo(newVATPrice, 3), disabled:true});
    this.simpleForm.patchValue({totalPrice: this.roundTo(newTotalPrice, 3)});
    this.simpleForm.patchValue({bookingTotalWithReoocur: this.roundTo(totalReoccur, 3)});
  
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);
    var newTotalPrice = parseFloat(this.simpleForm.controls['newBookingTotal'] ? this.f['newBookingTotal'].value : 0);
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
    var startDate = new Date(this.simpleForm.controls['startTime'] ? this.f['startTime'].value : '');
    var endDate = new Date(this.simpleForm.controls['endTime'] ? this.f['endTime'].value : '');
    this.isReoccur = this.simpleForm.controls['isReoccur'] ? this.f['isReoccur'].value : '';
    const duration = (endDate.getTime() - startDate.getTime())/60000;

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


    var existingSubTotalPrice = parseFloat(this.simpleForm.controls['subTotalPrice'] ? this.f['subTotalPrice'].value : 0);
    var existingAddonPrice = parseFloat(this.simpleForm.controls['bookingAddon'] ? this.f['bookingAddon'].value : 0);
    var existingVATPrice = parseFloat(this.simpleForm.controls['tax'] ? this.f['tax'].value : 0);
    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);

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

    var existingTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['totalPrice'].value : 0);
    var newTotalPrice = parseFloat(this.simpleForm.controls['totalPrice'] ? this.f['newBookingTotal'].value: 0);
    var diff = (newTotalPrice - existingTotalPrice);
    this.simpleForm.patchValue({totalRemainingAmount: this.roundTo(diff, 3)});
  }
  public updatePrice()
  {
    if (this.isUpdate)
    {
      this.updatePriceForEdit();
    }
    else
    {
      this.updatePriceForAdd();
    }
    this.simpleForm.markAsDirty();
  }
  public updateReoccur()
  {
    console.log("1 " + this.bookingReOccur);
    this.updateReoccurDay();
    var status = this.f['isReoccur'].value;
    if (status == "1")
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
    console.log("2 " + this.bookingReOccur);

    //console.log('selectedReoccurDay' + this.selectedReoccurDay);
    //this.bookingReOccur = true;
  }
  public updateReoccurDay()
  {
    var selectedDay = (new Date(this.bookingDate)).getDay();
    this.selectedReoccurDay = selectedDay;
  }
  public updateDate()
  {
    this.updateReoccurDay();
  }
  public roundTo = function(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };
  public updateCourtId(courtId)
  {
    //var startDate = new Date(this.f['startTime'].value);
    //var endDate = new Date(this.f['endTime'].value);
    var duration = 120;

    for (let court of this.courts.content)
    {
      if (court.id == courtId)
      {
        this.courtPrice30min = parseInt(court["30minPrice"]);
        this.courtPrice60min = parseInt(court["60minPrice"]);
        this.courtPrice90min = parseInt(court["90minPrice"]);
        this.courtPrice120min = parseInt(court["120minPrice"]);
        this.taxPercentage = court["taxPercentage"]/100;

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
    this.updatePrice();
  }
  public updateCancelled()
  {
    var status = this.f['cancelled'].value;
    if (status == '1')
    {
      this.cancelled = '1';
    }
    else
    {
      this.cancelled = '0';
    }

    //console.log('selectedReoccurDay' + this.selectedReoccurDay);
    //this.bookingReOccur = true;
  }
  deleteTransaction = (paymentId) => {
    return new Promise<any>(async (resolve, reject) => {
      //this.isLoading = true;
      const fields = {
        paymentId: paymentId,
        bookingId: this.bookingId
      };
      this.localInterfaceSrv.deleteTransaction(paymentId, this.bookingId)
      .then(async res => {
        resolve(res);
        this.toastr.success("Payment Removed", "Success");
        this.dangerModal.hide();
        this.route.queryParams.subscribe(async params => {
          await this.loadBookingsById(this.bookingId);
          await this.ngOnInit();
      });
        //window.location.reload()
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
        this.dangerModal.hide();
      })
      .finally(() => this.isLoading = false);
    });
  }
  public addNewPayment()
  {
    var paidOfflineAmount = this.f['paidOfflineAmount'].value;
    var paymentMethod = this.selectedPaymentMethod;
    var facilityId = this.facilityId;
    var bookingId = this.bookingId;
    var courtId = this.f['court'].value;
    var ccy = this.f['ccy'].value;

    var msg = '';
    if ((paidOfflineAmount == null || paidOfflineAmount == "null" || paidOfflineAmount <= 0) && !isNaN(paidOfflineAmount))
    {
      msg = "Paid Amount not entered";
      this.toastr.warning(msg, "Warning");
      return;
    }
    if (paymentMethod == null || paymentMethod == "null" || paymentMethod == '' || paymentMethod == 'undefined' || paymentMethod == undefined)
    {
      msg = "Payment Method not selected";
      this.toastr.warning(msg, "Warning");
      return;
    }
    this.addPayment(facilityId, courtId, bookingId, ccy, paidOfflineAmount, paymentMethod);

  }
  addPayment = (facilityId, courtId, bookingId, ccy, paidAmount, paymentCode) => {
    return new Promise<any>(async (resolve, reject) => {
      //this.isLoading = true;
      const fields = {
        facilityId, courtId, bookingId, ccy, paidAmount, paymentCode
      };
      this.localInterfaceSrv.addNewPayment(facilityId, courtId, bookingId, ccy, paidAmount, paymentCode)
      .then(async res => {
        resolve(res);
        this.toastr.success("Payment Added", "Success");
        this.addNewPaymentModal.hide();
        this.route.queryParams.subscribe(async params => {
          await this.loadBookingsById(this.bookingId);
          await this.ngOnInit();
      });
        //window.location.reload()
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
        this.addNewPaymentModal.hide();
      })
      .finally(() => this.isLoading = false);
    });
  }
}
