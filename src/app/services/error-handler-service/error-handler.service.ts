import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
// import { SharedService } from '../shared-service/error-handler-service/shared.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    // sharedSrv: SharedService
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a merchant-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
