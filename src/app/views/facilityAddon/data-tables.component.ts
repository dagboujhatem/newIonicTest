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
import { LocalInterfaceService } from '../../services/local-inteface-service/local-interface.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storege-service/storage.service';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss'],
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
  public facilityId = '';

 

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

  constructor(
    private dataTableService: DataTablesService, 
    public translateService: TranslateService, 
    public titleService: Title, 
    public router: Router, 
    public route: ActivatedRoute, 
    private http: HttpClient, 
    private httpService: HttpService,
    private localInterfaceSrv: LocalInterfaceService,
    private toastr: ToastrService,
    private storageSrv: StorageService
    ) {
    //this.toasterService = toasterService;
    this.isLoading = true;
    this.route.queryParams.subscribe(async params => {
      this.facilityId = this.storageSrv.getFacilityId();
      await this.loadAddons(this.facilityId);
  });
  }
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;


  loadAddons = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      this.localInterfaceSrv.getAddonsTable(facilityId)
      .then(res => {
        this.dbData = res;
        this.isLoading = false;
        resolve(res);
      })
      .catch(err => { 
        reject(err); 
        console.log(err)
        //this.toastr.error(err.description, "Error");
      })
      .finally(() => this.isLoading = false);
    });
  }

  deleteAddon = (addonId) => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      const fields = {
        addonId: addonId
      };
      this.localInterfaceSrv.deleteAddon(addonId)
      .then(async res => {
        resolve(res);
        this.toastr.success("Addon Removed", "Success");
        this.dangerModal.hide();
        this.route.queryParams.subscribe(async params => {
          await this.loadAddons(this.facilityId);
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
  public async delete(content?) {
    var fd = new FormData();

    fd.append('addonId',content.id);

    return await this.httpService.post('deleteAddonsTable', fd, '')
    .then(
      data => {
        window.location.reload()
      },
      error => {
        this.dangerModal.hide();
        // this.toastComp.doShow("Error", 'An error has occured, please try again later');
      }
    ).catch();
  }
}
