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

import { ToastrService } from 'ngx-toastr';
import { LocalInterfaceService } from '../../../services/local-inteface-service/local-interface.service';

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
  public courts?;
  public users?;
  isUpdate: boolean = false;
  dbFunction?: string;
  name: string;
  mobile: string;
  country_code: string;
  gender: string;
  dob: Date;
  language: string;
  status: string;
  public isLoading = false;

  isError: boolean = false;

  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  //private toasterService: ToasterService;
  //public toasterconfig: ToasterConfig = new ToasterConfig({tapToDismiss: true, timeout: 5000});
  
  @ViewChild(ToastComp) toastComp: ToastComp;

  public paddingStyle: Object = { 'padding-right': '20px'};


  constructor(
    private router: Router, 
    private http: HttpClient, 
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public vf: ValidationFormsService, 
    public httpService: HttpService,
    private toastr: ToastrService,
    private localInterfaceSrv: LocalInterfaceService
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
      this.dbFunction = 'updateUsersTable';
      this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      this.name = this.mfData['name'];
      this.mobile = this.mfData['mobile'];
      this.country_code = this.mfData['country_code'];
      this.gender = this.mfData['gender'];
      this.dob = new Date(this.mfData['dob']);
      this.language = this.mfData['language'];
      this.status = this.mfData['status'];
    }
    else
    {
      this.dbFunction = '/addBooking';
      this.name = '';
      this.mobile = '';
      this.country_code = '';
      this.gender = '';
      this.dob = new Date();
      this.language = '';
      this.status = '';
    }
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
      country_code: [this.country_code, [Validators.required]],
      gender: [this.gender, [Validators.required]],
      dob: [this.dob],
      language: [this.language],
      status: [this.status],
    }, { });
  }
  get f() { return this.simpleForm.controls; }


  async showSuccess(msg) {

    await this.toastr.success(msg, 'Success');

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
          //window.location.reload();
        });;
      });  
    }
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

saveUser = () => {
  return new Promise<any>(async (resolve, reject) => {
    this.isLoading = true;
    const fields = {
      userId: this.mfData['id'],
      name: this.f['name'].value,
      mobile: this.f['mobile'].value,
      country_code: this.f['country_code'].value,
      gender: this.f['gender'].value,
      dob: this.f['dob'].value,
      language: this.f['language'].value,
      status: this.f['status'].value,
    };
    if (this.isUpdate) 
    {
      this.localInterfaceSrv.updateUser(fields)
      .then(async res => {
        resolve(res);
        this.showSuccess('User Updated');
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
      })
      .finally(() => this.isLoading = false);
    } 
    else 
    {
      this.localInterfaceSrv.addUser(fields)
      .then(async res => {
        resolve(res);
        this.showSuccess('User Added');
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
      })
      .finally(() => this.isLoading = false);
    }
  });
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
      //return;
    }

    // TODO: Use EventEmitter with form value
    this.mfData['name'] = this.f['name'].value
    this.mfData['mobile'] = this.f['mobile'].value
    this.mfData['country_code'] = this.f['country_code'].value
    this.mfData['gender'] = this.f['gender'].value
    this.mfData['dob'] = this.f['dob'].value
    this.mfData['language'] = this.f['language'].value
    this.mfData['status'] = this.f['status'].value

    let formattedDob = new Date(this.mfData['dob']).toISOString().toString().substr(0, 10);

    fd.append('userId',this.mfData['id']);
    fd.append('name',this.mfData['name']);
    fd.append('mobile',this.mfData['mobile']);
    fd.append('country_code',this.mfData['country_code']);
    fd.append('gender',this.mfData['gender']);
    fd.append('dob',formattedDob);
    fd.append('language',this.mfData['language']);
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
