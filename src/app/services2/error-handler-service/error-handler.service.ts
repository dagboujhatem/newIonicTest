import { Injectable } from '@angular/core';
import { SharedService } from '../shared-service/error-handler-service/shared.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    sharedSrv: SharedService
  ) {
  }


  handler = (err, alert = true) => {
    return new Promise<string>(async (resolve, reject) => {
      const title = 'Alert';
      let desc = '';
      switch (+err.code) {
        case -1:
          desc = 'We are not able to process your request at the moment, please try again later';
          break;
        default:
          desc = 'We are not able to process your request at the moment, please try again later';
      }
      if (alert) {
        // setTimeout(() => { //this.sharedSrv.alert(title, null, desc);  }, 100);
      }
      console.log('Error handler: ', err);
      resolve(desc);
    });
  }
}
