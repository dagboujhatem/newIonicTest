import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class OnlineInterfaceService {
  constructor(private http: HttpService) { }

  getMerchantOnBoardingList = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('auth/portal/getMerchantOnBoardingList', {
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data.content);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getMerchantOnBoardingDetails = (merchantID) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('auth/portal/getMerchantOnBoardingDetails', {
        merchantID
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data.content[0]);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getTransactionList = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('auth/portal/getTransactionList', {
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data.content);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getTransactionDetails = (trnId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('auth/portal/getTransactionDetails', {
        id: trnId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data.content[0]);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

}
