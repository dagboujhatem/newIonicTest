import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { StorageService } from '../storege-service/storage.service';
import { Router } from '@angular/router';

const BASE_URL = environment.BASE_URL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private error: ErrorHandlerService,
    private storageSrv: StorageService
    ) {
  }

  async post(fun, param, loading, isFormData = false) {
    return new Promise<any>(async (resolve, reject) => {
        if (!environment.production) { console.log('[ %cHTTP POST', 'font-weight: bold', '] Call to', fun); }
        // if (loading) { await this.sharedSrv.loadingPresent(); }
        const headerData = (fun !== 'login') ? await this.generateHeader() : {};
        const bodyData = isFormData ? await this.appendObj(param) : param;
        this.httpClient.post(BASE_URL + fun + '/', bodyData, headerData)
        .subscribe(async res => {
          const data: any = res;
          console.log(data);
          // if (loading) { await this.sharedSrv.loadingDismiss(); }
          if (!environment.production) { console.log('HttpClient response:', res); }
          // await this.responseHeaderHandler(res.headers);
          this.responseBodyHandler(data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
        },
        async err => {
          // if (loading) { await this.sharedSrv.loadingDismiss(); }
          if (!environment.production) {
            console.log('HttpClient Error: ' , err);
            console.log('HttpClient Error: ' , err.error);
          }
          this.storageSrv.signOut();
          this.router.navigate(['/login/']);
          reject(err);
        });
    });
  }


  generateHeader() {
    return new Promise<any>(async (resolve) => {
      const token = this.storageSrv.getToken();
      const facilityId = this.storageSrv.getFacilityId();
      const httpOptions = {
        headers: new HttpHeaders({ 
          'x-token': token,
          'facilityId' : facilityId,
        })
      };
      resolve(httpOptions);
    });
  }

  responseBodyHandler(res) {
    return new Promise<any>(async (resolve, reject) => {
      if (res.result && res.result.isSuccess) {
        // if (res.result.showAlert) { this.sharedSrv.alert(res.result.title, null, res.result.desc); }
        if (!environment.production) { console.log('responseBodyHandler: ', res.data); }
        resolve(res.data);
      } else {
        // if (res.result.showAlert) { this.sharedSrv.alert(res.result.title, null, res.result.desc); }
        if (!environment.production) { console.log('responseBodyHandlerError: ', res.result); }
        reject(res.result);
      }
    });
  }

  responseHeaderHandler(headers) {
    return new Promise<any>(async (resolve) => {
      if (!environment.production) { console.log('responseHeaderHandler: ', headers); }
      if (headers.get('token')) {
        await this.setToken(headers.get('token'));
        resolve(true);
      }
      else {
        resolve(true);
      }
    });
  }

  setToken = (token) => {
    return new Promise<any>((resolve) => {
      this.storageSrv.setToken(token);
      resolve(token);
    });
  }

  appendObj = (obj) => {
    return new Promise<FormData>((resolve) => {
      const formData = new FormData();
      Object.keys(obj).forEach(async key => {
        if (!Array.isArray(obj[key])) {
          // if (key == 'file') {
          //   console.log(key);
          //   console.log(obj[key]);
          //   formData.append(key, obj[key], obj[key].name);
          // }
          // else {
            formData.append(key, obj[key]);
          // }
        }
        else {
          formData.append(key, JSON.stringify(obj[key]));
        }
      });
      resolve(formData);
    });
  }
}
