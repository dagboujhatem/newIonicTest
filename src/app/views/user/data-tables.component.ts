import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation,QueryList } from '@angular/core';
import { ITableData, DataTablesService } from './data-tables.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
//import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { SpinkitComponent } from '@coreui/angular/lib/spinkit/spinkit.component';
import { AppToastComponent as ToastComp } from '../../services/shared-service/toast-simple/toast.component'
import { HttpService } from '../../services/http-service/http.service'
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss','../../../scss/vendors/toastr/toastr.scss'],
  providers: [ DataTablesService ],
  encapsulation: ViewEncapsulation.None,
})
export class DataTablesComponent {
  error: any;
  public dbData?;
  public isLoading: boolean = true;
  public currentIndex = 0;
  public filterQuery = '';
  public btnLang: string;
  public langDir: string = "ltr";
  // public toasterService: ToasterService;
  // // public toasterconfig: ToasterConfig =
  // // new ToasterConfig({
  // //   tapToDismiss: true,
  // //   timeout: 5000
  // // });

  @ViewChild(ToastComp) toastComp: ToastComp;

  title = 'ng';
  langs = ['en', 'ar'];

  public ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translateService.setDefaultLang(browserlang);
      this.btnLang = 'English';
      this.langDir = 'rtl';
    } else {
      this.translateService.setDefaultLang('en');
      this.btnLang = "العربية";
      this.langDir = 'ltr';
    }
  }

  constructor(private dataTableService: DataTablesService, public translateService: TranslateService, public titleService: Title, public router: Router, public route: ActivatedRoute, private http: HttpClient, private httpService: HttpService) {
    //this.toasterService = toasterService;
    this.isLoading = true;
    this.getUsers();
    //console.log(this.data);
    // this.getUsers.getData().subscribe(
    //   (data) => {
    //     setTimeout(() => {
    //       this.dbData = data; 
    //     }, 1500);
    //   }, // success path
    //   (error) => (this.error = error) // error path
    // );
  }

  public async getUsers()
  {

    //his.httpService.post('/getUsers', '', '');
    return await this.httpService.post('getUsers', '', '')
    .then(
      data => {
        setTimeout(() => {
                this.isLoading = false;
                this.dbData = data; 
              }, 1500);
      },
      error => {console.log(error)},
    ).catch();


    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    
    // return await this.http.post<any>('http://192.168.64.2/Lamenu-Admin-API/public/getUsers/', {headers: headers}).toPromise()
    // .then(
    //   data => {
    //     setTimeout(() => {
    //             this.isLoading = false;
    //             this.dbData = data; 
    //           }, 1500);
    //   },
    //   error => {console.log(error)},
    // );
  }
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }

  public showEdit(data: object) {
    this.router.navigate(['details'], {state: {data: data}, relativeTo: this.route});
  }
  public add() {
    this.router.navigate(['details'], {state: {createData: ''}, relativeTo: this.route});
  }
  public async delete(content: object) {
    return await this.httpService.post('deleteUser', '', '')
    .then(
      data => {window.location.reload()},
      error => {
        this.dangerModal.hide();
        this.toastComp.doShow("Error", 'An error has occured, please try again later');
      }
    ).catch();
  }
}
