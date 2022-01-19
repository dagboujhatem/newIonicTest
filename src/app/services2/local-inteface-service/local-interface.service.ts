import { Injectable } from '@angular/core';
import { OnlineInterfaceService } from '../online-interface-service/online-interface.service';

@Injectable({
  providedIn: 'root'
})
export class LocalInterfaceService {
  constructor(
    private onlineInterfaceSrv: OnlineInterfaceService
  ) { }

  getMerchantOnBoardingList = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getMerchantOnBoardingList()
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getMerchantOnBoardingDetails = (merchantId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getMerchantOnBoardingDetails(merchantId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getTransactionList = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getTransactionList()
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getTransactionDetails = (tranId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getTransactionDetails(tranId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }
}
