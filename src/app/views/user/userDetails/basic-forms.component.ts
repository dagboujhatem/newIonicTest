import { Component, Input, ViewEncapsulation, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { ValidationFormsService } from './validation-forms.service';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToasterComponent, ToasterPosition } from '@coreui/angular';
import { AppToastComponent as ToastComp } from '../../../services/shared-service/toast-simple/toast.component'
import { HttpService } from '../../../services/http-service/http.service'

@Component({
  selector: 'app-toasters',
  templateUrl: 'basic-forms.component.html',
  styleUrls: ['../../../../scss/vendors/toastr/toastr.scss', "../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",],
  encapsulation: ViewEncapsulation.None,
  providers: [ ToasterService, ValidationFormsService ]
})


export class BasicFormsComponent {


  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2022, 9, 15);

  bsValue: Date = new Date();

// Timepicker

  public isEnabled: boolean = true;


  public mfData? : object = {};
  public userTypes?;
  isUpdate: boolean = false;
  dbFunction?: string;
  name: string;
  mobile: string;
  email: string;
  countryCode: string;
  dob: Date;
  country: string;
  status: string;
  gender: string;
  preferredLanguage: string;
  verifiedEmail: string;
  verifiedMobile: string;
  forceChangePasswordFlag: string;
  updateKYCFlag: string;
  longitude: string;
  latitude: string;
  fromDate: string;
  toDate: string;
  startTime: string;
  endTime: string;
  weather: string;
  ccy: string;
  price: string;
  airport: string;
  Accommodation: string;
  neededTools: string;
  neededToolsAr: string;
  providedTools: string;
  providedToolsAr: string;
  totalChairs: string;
  availableChairs: string;
  categoryId?: number;
  imageUrl: string;
  brouchureUrl: string;
  uploadedImage: File;
  uploadedBrochure: File;
  isShowPref: boolean;
  isShowSchd: boolean;
  userType?: string;

  isError: boolean = false;

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig = new ToasterConfig({tapToDismiss: true, timeout: 5000});
  
  @ViewChild(ToastComp) toastComp: ToastComp;

  public paddingStyle: Object = { 'padding-right': '20px'};


  constructor(private router: Router, private http: HttpClient, public route: ActivatedRoute, toasterService: ToasterService,private fb: FormBuilder,public vf: ValidationFormsService, public httpService: HttpService) {
    //if (localStorage.getItem('currentUser') === null) {this.router.navigateByUrl('/login');}
    if (localStorage.getItem('lang') === "ar") {this.toasterconfig = new ToasterConfig({tapToDismiss: true, timeout: 5000, positionClass: 'toast-top-left'});}
    this.toasterService = toasterService;
    this.formErrors = this.vf.errorMessages;
    this.isShowPref = false;
    this.isShowSchd = false;

    if(this.router.getCurrentNavigation().extras.state?.createData == null)
    {
      this.isUpdate = true;
      this.dbFunction = 'updateUser';
      this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      this.userType = this.mfData['type'];
      this.name = this.mfData['name'];
      this.email = this.mfData['email'];
      this.mobile = this.mfData['mobile'];
      this.countryCode = this.mfData['countryCode'];
      this.dob = new Date(this.mfData['dob']);
      this.gender = this.mfData['gender'];
      this.preferredLanguage = this.mfData['preferredLanguage'];
      this.verifiedEmail = this.mfData['verifiedEmail'];
      this.verifiedMobile = this.mfData['verifiedMobile'];
      this.forceChangePasswordFlag = this.mfData['forceChangePasswordFlag'];
      this.updateKYCFlag = this.mfData['updateKYCFlag'];
      this.status = this.mfData['status'];
    }
    else
    {
      this.dbFunction = '/addUser';
      this.userType = null;
      this.name = '';
      this.mobile = '';
      this.email = '';
      this.countryCode = '';
      this.dob = new Date();
      this.gender = '';
      this.preferredLanguage = '';
      this.verifiedEmail = '';
      this.verifiedMobile = '';
      this.forceChangePasswordFlag = '';
      this.updateKYCFlag = '';
      this.status = '';
    }
    this.getUserTypes();
    this.createForm();
  }


  
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  @Input() message : string;
  messages: string[] = [];
  updatedData = this.mfData;

  // Validators.pattern('^[0-9]{4}[\/][1-9]|1[012][\/][0-9]{2}$')]
  createForm() {
    this.simpleForm = this.fb.group({
      userType: [this.userType, [Validators.required]],
      name: [this.name, [Validators.required]],
      mobile: [this.mobile, [Validators.required]],
      email: [this.email, [Validators.required]],
      countryCode: [this.countryCode, [Validators.required]],
      dob: [this.dob],
      gender: [this.gender],
      preferredLanguage: [this.preferredLanguage, [Validators.required]],
      verifiedEmail: [this.verifiedEmail, [Validators.required]],
      verifiedMobile: [this.verifiedMobile, [Validators.required]],
      forceChangePasswordFlag: [this.forceChangePasswordFlag, [Validators.required]],
      updateKYCFlag: [this.updateKYCFlag, [Validators.required]],
      status: [this.status, [Validators.required]],
    }, { });
  }
  
  get f() { return this.simpleForm.controls; }


  async showSuccess(msg) {

    await this.toastComp.doShow('Success', msg);

    if (this.isUpdate && !this.isError)
    {
      this.delay(2000).then(any=>{
        this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
          //window.location.reload();
        });;
      });  
    }
    else if (!this.isUpdate && this.isError == false)
    {
      this.delay(2000).then(any=>{
        this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
          window.location.reload();
        });;
      });  
    }
  }

  showError(msg) {
    this.toasterService.pop('error', 'Error', msg);
  }

  uploadFile(event) {
    let files = event.target.files;
    const reader = new FileReader();
    if (files.length > 0) {
      this.uploadedImage = files[0]; // You will see the file
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { 
        this.imageUrl = reader.result.toString().replace('../pangaea/', ''); 
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
        this.brouchureUrl = reader.result.toString().replace('../pangaea/', ''); 
    }
    }

  }
  public showEdit()
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
  public showPref()
  {
    if (this.isShowPref)
    {
      this.isShowPref = false;
    }
    else 
    {
      this.isShowSchd = false;
      this.isShowPref = true;
    }
    //this.router.navigate(['FacilityPreferences'], {state: {data: ''}, relativeTo: this.route});
  }
  public showSchdule()
  {
    if (this.isShowSchd)
    {
      this.isShowSchd = false;
    }
    else 
    {
      this.isShowPref = false;
      this.isShowSchd = true;
    }
    //this.router.navigate(['FacilityPreferences'], {state: {data: ''}, relativeTo: this.route});
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

  public submitDB(content: object) {
    this.submitted = true;
    var fd = new FormData();

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      var msg = "";
      if (this.simpleForm.controls['name'].invalid)
      {
        msg = "Image not uploaded."
      }
      else if (this.simpleForm.controls['mobile'].invalid)
      {
        msg = "Brouchure not uploaded."
      }
      else if (this.simpleForm.controls['email'].invalid)
      {
        msg = "Invalid From Date"
      }
      else if (this.simpleForm.controls['countryCode'].invalid)
      {
        msg = "Invalid To Date"
      }
      else if (this.simpleForm.controls['dob'].invalid)
      {
        msg = "Invalid Date of Birth"
      }
      else if (this.simpleForm.controls['gender'].invalid)
      {
        msg = "Invalid Gender"
      }
      else
      {
        msg = 'An error has occured, please check missing fields and try again';
      }
      this.toastComp.doShow("Error", msg);
      this.toastComp.doShow("Error", "Check Invalid Fields: " + this.findInvalidControls());
      //this.showError("Check Invalid Fields: " + this.findInvalidControls());
      return;
    }


    // TODO: Use EventEmitter with form value
    this.mfData['userType'] = this.f['userType'].value
    this.mfData['name'] = this.f['name'].value
    this.mfData['mobile'] = this.f['mobile'].value
    this.mfData['email'] = this.f['email'].value
    this.mfData['countryCode'] = this.f['countryCode'].value
    this.mfData['dob'] = this.f['dob'].value
    this.mfData['gender'] = this.f['gender'].value
    this.mfData['preferredLanguage'] = this.f['preferredLanguage'].value
    this.mfData['verifiedEmail'] = this.f['verifiedEmail'].value
    this.mfData['verifiedMobile'] = this.f['verifiedMobile'].value
    this.mfData['forceChangePasswordFlag'] = this.f['forceChangePasswordFlag'].value
    this.mfData['updateKYCFlag'] = this.f['updateKYCFlag'].value
    this.mfData['status'] = this.f['status'].value

    let formattedDob = new Date(this.mfData['dob']).toISOString().toString().substr(0, 10);

    fd.append('userType',this.mfData['userType']);
    fd.append('id',this.mfData['id']);
    fd.append('name',this.mfData['name']);
    fd.append('email',this.mfData['email']);
    fd.append('password',this.mfData['password']);
    fd.append('salt',this.mfData['salt']);
    fd.append('mobile',this.mfData['mobile']);
    fd.append('countryCode',this.mfData['countryCode']);
    fd.append('dob',formattedDob);
    fd.append('gender',this.mfData['gender']);
    fd.append('preferredLanguage',this.mfData['preferredLanguage']);
    fd.append('verifiedEmail',this.mfData['verifiedEmail']);
    fd.append('verifiedMobile',this.mfData['verifiedMobile']);
    fd.append('forceChangePasswordFlag',this.mfData['forceChangePasswordFlag']);
    fd.append('updateKYCFlag',this.mfData['updateKYCFlag']);
    fd.append('status',this.mfData['status']);


    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.httpService.post(this.dbFunction, fd, '')
    .then(
      data => {
              if (this.isUpdate) {this.showSuccess('User updated');} else {this.showSuccess('User added')}
      },
      error => {if (this.isUpdate) {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);} else {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);}},
    ).catch();

    // this.http.post<any>(this.dbFunction, fd)
    // .subscribe(
    //   data => {if (this.isUpdate) {this.showSuccess('User updated');} else {this.showSuccess('User added')}},
    //   error => {if (this.isUpdate) {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);} else {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);}},
    // );
    //this.showSuccess();
     
    //this.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //this.http.post('https://pangaeaclub.net/database.php', data);

    //this.router.navigate(['basic-forms'], {state: {data: data}, relativeTo: this.route});
  }
  public getUserTypes()
  {
    this.httpService.post('getUserType', '', '')
    .then(
      data => {this.userTypes = data},
      error => {if (this.isUpdate) {this.isError = true;this.toastComp.doShow('Error', 'An error has occured, please check missing and try again')} else {this.isError = true;this.toastComp.doShow('Error', 'An error has occured, please check missing and try again')}},
    ).catch();
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


}
