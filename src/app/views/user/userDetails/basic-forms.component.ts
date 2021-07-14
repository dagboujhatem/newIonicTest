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

public hstep: number = 1;
public mstep: number = 15;
public ismeridian: boolean = true;
public isEnabled: boolean = true;

public mytime: Date = new Date();
public mytime2: Date = new Date();
public mytime3: Date = new Date();
public mytime4: Date = new Date();
public mytime5: Date = new Date();
public mytime6: Date = new Date();
public mytime7: Date = new Date();
public mytime8: Date = new Date();
public mytime9: Date = new Date();
public mytime10: Date = new Date();
public mytime11: Date = new Date();
public mytime12: Date = new Date();
public mytime13: Date = new Date();
public mytime14: Date = new Date();

public options: any = {
  hstep: [1, 2, 3],
  mstep: [1, 5, 10, 15, 25, 30]
};

  public mfData? : object = {};
  public categories?  = [];
  isUpdate: boolean = false;
  dbUrl?: string;
  name: string;
  mobile: string;
  email: string;
  countryCode: string;
  dob: string;
  country: string;
  status: string;
  gender: string;
  prefLang: string;
  verifiedEmail: string;
  verifiedMobile: string;
  forcePwd: string;
  updateKyc: string;
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

  isError: boolean = false;

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig = new ToasterConfig({tapToDismiss: true, timeout: 5000});
  
  @ViewChild(ToastComp) toastComp: ToastComp;

  public paddingStyle: Object = { 'padding-right': '20px'};


  constructor(private router: Router, private http: HttpClient, public route: ActivatedRoute, toasterService: ToasterService,private fb: FormBuilder,public vf: ValidationFormsService) {
    //if (localStorage.getItem('currentUser') === null) {this.router.navigateByUrl('/login');}
    if (localStorage.getItem('lang') === "ar") {this.toasterconfig = new ToasterConfig({tapToDismiss: true, timeout: 5000, positionClass: 'toast-top-left'});}
    this.toasterService = toasterService;
    this.formErrors = this.vf.errorMessages;
    this.isShowPref = false;
    this.isShowSchd = false;

    if(this.router.getCurrentNavigation().extras.state?.createData == null)
    {
      this.isUpdate = true;
      this.dbUrl = 'http://192.168.64.2/Lamenu-Admin-API/public/updateUser';
      this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      this.name = this.mfData['name'];
      this.email = this.mfData['email'];
      this.mobile = this.mfData['mobile'];
      this.countryCode = this.mfData['countryCode'];
      this.dob = this.mfData['dob'];
      this.gender = this.mfData['gender'];
      this.prefLang = this.mfData['preferredLanguage'];
      this.verifiedEmail = this.mfData['verifiedEmail'];
      this.verifiedMobile = this.mfData['verifiedMobile'];
      this.forcePwd = this.mfData['forceChangePasswordFlag'];
      this.updateKyc = this.mfData['updateKYCFlag'];
      this.status = this.mfData['status'];
    }
    else
    {
      this.dbUrl = 'http://192.168.64.2/Lamenu-Admin-API/public/addUser';
      this.name = '';
      this.mobile = '';
      this.email = '';
      this.countryCode = '';
      this.dob = '';
      this.gender = '';
      this.prefLang = '';
      this.verifiedEmail = '';
      this.verifiedMobile = '';
      this.forcePwd = '';
      this.updateKyc = '';
      this.status = '';
    }
    //this.getCategories();
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
      name: [this.name, [Validators.required]],
      mobile: [this.mobile, [Validators.required]],
      email: [this.email, [Validators.required]],
      countryCode: [this.countryCode, [Validators.required]],
      dob: [this.dob, [Validators.required]],
      gender: [this.gender, [Validators.required, Validators.maxLength(2)]],
      prefLang: [this.prefLang, [Validators.required]],
      verifiedEmail: [this.verifiedEmail, [Validators.required]],
      verifiedMobile: [this.verifiedMobile, [Validators.required]],
      forcePwd: [this.forcePwd, [Validators.required]],
      updateKyc: [this.updateKyc, [Validators.required]],
      status: [this.status, [Validators.required]],
    }, { });
  }
  
  get f() { return this.simpleForm.controls; }


  showSuccess(msg) {

    this.toasterService.pop('success', 'Success', msg);

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
        msg = "Invalid Start Time"
      }
      else if (this.simpleForm.controls['gender'].invalid)
      {
        msg = "Invalid End Time"
      }
      else
      {
        msg = 'An error has occured, please check missing and try again';
      }
      this.toastComp.doShow("Error", msg);
      //this.showError(msg);
      //this.showError("Check Invalid Fields: " + this.findInvalidControls());
      return;
    }


    // TODO: Use EventEmitter with form value
    this.mfData['categoryId'] = this.f['categoryId'].value
    this.mfData['name'] = this.f['name'].value
    this.mfData['mobile'] = this.f['mobile'].value
    this.mfData['email'] = this.f['email'].value
    this.mfData['countryCode'] = this.f['countryCode'].value
    this.mfData['dob'] = this.f['dob'].value
    this.mfData['gender'] = this.f['gender'].value
    this.mfData['prefLang'] = this.f['prefLang'].value
    this.mfData['verifiedEmail'] = this.f['verifiedEmail'].value
    this.mfData['verifiedMobile'] = this.f['verifiedMobile'].value
    this.mfData['forcePwd'] = this.f['forcePwd'].value
    this.mfData['updateKyc'] = this.f['updateKyc'].value
    this.mfData['status'] = this.f['status'].value

    fd.append('id',this.mfData['id']);
    fd.append('name',this.mfData['name']);
    fd.append('mobile',this.mfData['mobile']);
    fd.append('countryCode',this.mfData['countryCode']);
    fd.append('dob',this.mfData['dob']);
    fd.append('gender',this.mfData['gender']);
    fd.append('prefLang',this.mfData['prefLang']);
    fd.append('verifiedEmail',this.mfData['verifiedEmail']);
    fd.append('verifiedMobile',this.mfData['verifiedMobile']);
    fd.append('forcePwd',this.mfData['forcePwd']);
    fd.append('updateKyc',this.mfData['updateKyc']);
    fd.append('status',this.mfData['status']);


    let headers = new Headers();
    headers.append('Content-Type','application/json');


    this.http.post<any>(this.dbUrl, fd)
    .subscribe(
      data => {if (this.isUpdate) {this.showSuccess('Event updated');} else {this.showSuccess('Event added')}},
      error => {if (this.isUpdate) {this.isError = true;this.showError('An error has occured in db, please check missing and try again');console.log(error);} else {this.isError = true;this.showError('An error has occured in db, please check missing and try again');console.log(error);}},
    );
    //this.showSuccess();
     
    //this.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //this.http.post('https://pangaeaclub.net/database.php', data);

    //this.router.navigate(['basic-forms'], {state: {data: data}, relativeTo: this.route});
  }
  public getCategories()
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post<any>('https://pangaeaclub.net/database.php/getCategories', {headers: headers})
    .subscribe(
      data => {this.categories = [...data]},
      error => {if (this.isUpdate) {this.isError = true;this.showError('An error has occured, please check missing and try again')} else {this.isError = true;this.showError('An error has occured, please check missing and try again')}},
    );
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


  public toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }

  public update(): void {
    const d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  }

  public changed(): void {
    console.log('Time changed to: ' + this.mytime);
  }

  public clear(): void {
    this.mytime = void 0;
  }

}
