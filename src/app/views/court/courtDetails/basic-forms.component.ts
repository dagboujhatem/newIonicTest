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

import { LocalInterfaceService } from '../../../services/local-inteface-service/local-interface.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/storege-service/storage.service';

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
  nameEn: string;
  nameAr: string;
  size: string;
  backgroundColor: string;
  price30min: string;
  price60min: string;
  price90min: string;
  price120min: string;
  ccy: string;
  status: string;
  public facilityId = '1';
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
    private localInterfaceSrv: LocalInterfaceService,
    private storageSrv: StorageService,
    ) {
    //if (localStorage.getItem('currentUser') === null) {this.router.navigateByUrl('/login');}
    if (localStorage.getItem('lang') === "ar") {
      //this.toasterconfig = new ToasterConfig({tapToDismiss: true, timeout: 5000, positionClass: 'toast-top-left'});
    }
    //this.toasterService = toasterService;
    this.formErrors = this.vf.errorMessages;
    this.facilityId = this.storageSrv.getFacilityId();

    if(this.router.getCurrentNavigation().extras.state?.createData == null)
    {
      this.isUpdate = true;
      this.mfData = this.router.getCurrentNavigation().extras.state?.data;
      this.nameEn = this.mfData['nameEn'];
      this.nameAr = this.mfData['nameAr'];
      this.size = this.mfData['size'];
      this.backgroundColor = this.mfData['backgroundColor'];
      this.price30min = this.mfData['30minPrice'];
      this.price60min = this.mfData['60minPrice'];
      this.price90min = this.mfData['90minPrice'];
      this.price120min = this.mfData['120minPrice'];
      this.ccy = this.mfData['ccy'];
      this.status = this.mfData['status'];
    }
    else
    {
      this.nameEn = '';
      this.nameAr = '';
      this.size = '';
      this.backgroundColor = '';
      this.price30min = '';
      this.price60min = '';
      this.price90min = '';
      this.price120min = '';
      this.ccy = '';
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
      nameEn: [this.nameEn, [Validators.required]],
      nameAr: [this.nameAr, [Validators.required]],
      size: [this.size, [Validators.required]],
      backgroundColor: [this.backgroundColor, [Validators.required]],
      price30min: [this.price30min, [Validators.required]],
      price60min: [this.price60min, [Validators.required]],
      price90min: [this.price90min, [Validators.required]],
      price120min: [this.price120min, [Validators.required]],
      ccy: [this.ccy, [Validators.required]],
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

  showError(msg) {
    //this.toasterService.pop('error', 'Error', msg);
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


saveCourt = () => {
  return new Promise<any>(async (resolve, reject) => {
    this.isLoading = true;
    const fields = {
      courtId: this.mfData['id'],
      facilityId: this.facilityId,
      nameEn: this.f['nameEn'].value,
      nameAr: this.f['nameAr'].value,
      size: this.f['size'].value,
      backgroundColor: this.f['backgroundColor'].value,
      price30min: this.f['price30min'].value,
      price60min: this.f['price60min'].value,
      price90min: this.f['price90min'].value,
      price120min: this.f['price120min'].value,
      ccy: this.f['ccy'].value,
      status: this.f['status'].value,
    };
    if (this.isUpdate) 
    {
      this.localInterfaceSrv.updateCourt(fields)
      .then(async res => {
        resolve(res);
        this.showSuccess('Court Updated');
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
      })
      .finally(() => this.isLoading = false);
    } 
    else 
    {
      console.log('adddddddd');
      this.localInterfaceSrv.addCourt(fields)
      .then(async res => {
        resolve(res);
        this.showSuccess('Court Added');
      })
      .catch(err => { 
        reject(err); 
        this.toastr.error(err.description, "Error");
      })
      .finally(() => this.isLoading = false);
    }
  });
}

  // public submitDB(content: object) {
  //   this.submitted = true;
  //   var fd = new FormData();

  //   // stop here if form is invalid
  //   if (this.simpleForm.invalid) {
  //     var msg = "";
  //     if (this.simpleForm.controls['name'].invalid)
  //     {
  //       msg = "Image not uploaded."
  //     }
  //     else if (this.simpleForm.controls['mobile'].invalid)
  //     {
  //       msg = "Brouchure not uploaded."
  //     }
  //     else if (this.simpleForm.controls['email'].invalid)
  //     {
  //       msg = "Invalid From Date"
  //     }
  //     else if (this.simpleForm.controls['countryCode'].invalid)
  //     {
  //       msg = "Invalid To Date"
  //     }
  //     else if (this.simpleForm.controls['dob'].invalid)
  //     {
  //       msg = "Invalid Date of Birth"
  //     }
  //     else if (this.simpleForm.controls['gender'].invalid)
  //     {
  //       msg = "Invalid Gender"
  //     }
  //     else
  //     {
  //       msg = 'An error has occured, please check missing fields and try again';
  //     }
  //     this.toastComp.doShow("Error", msg);
  //     this.toastComp.doShow("Error", "Check Invalid Fields: " + this.findInvalidControls());
  //     //this.showError("Check Invalid Fields: " + this.findInvalidControls());
  //     //return;
  //   }

  //   // TODO: Use EventEmitter with form value
  //   this.mfData['nameEn'] = this.f['nameEn'].value
  //   this.mfData['nameAr'] = this.f['nameAr'].value
  //   this.mfData['size'] = this.f['size'].value
  //   this.mfData['backgroundColor'] = this.f['backgroundColor'].value
  //   this.mfData['price'] = this.f['price'].value
  //   this.mfData['ccy'] = this.f['ccy'].value
  //   this.mfData['status'] = this.f['status'].value

  //   fd.append('courtId',this.mfData['id']);
  //   fd.append('facilityId',this.mfData['facilityId']);
  //   fd.append('nameEn',this.mfData['nameEn']);
  //   fd.append('nameAr',this.mfData['nameAr']);
  //   fd.append('size',this.mfData['size']);
  //   fd.append('backgroundColor',this.mfData['backgroundColor']);
  //   fd.append('price',this.mfData['price']);
  //   fd.append('ccy',this.mfData['ccy']);
  //   fd.append('status',this.mfData['status']);

  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');

  //   this.httpService.post(this.dbFunction, fd, '')
  //   .then(
  //     data => {
  //             if (this.isUpdate) {this.showSuccess('Court updated');} else {this.showSuccess('Court added')}
  //     },
  //     error => {if (this.isUpdate) {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);} else {this.isError = true;this.toastComp.doShow('Error', 'An error has occured in db, please check missing and try again');console.log(error);}},
  //   ).catch();

  // }

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
