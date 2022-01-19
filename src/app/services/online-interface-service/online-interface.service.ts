import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class OnlineInterfaceService {
  constructor(private http: HttpService) { }

  login = (username, password) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('login', {
        username,
        password
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  logout = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('backofficeLogout', {
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data[0]);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  changePassword = (ownerId, oldPassword, newPassword) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('changePassword', {
        ownerId,
        oldPassword,
        newPassword
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Padel Getters -----------------//
  
  getDashboardStatistics = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getDashboard', {
        facilityId
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

  getBookings = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getBookings', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }
  getBookingsById = (bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getBookingsById', {
        bookingId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getBookingsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getBookingsCalendar', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getCourtsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getCourtsCalendar', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getDisabledCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getDisabledCalendar', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getPaymentMethods = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getPaymentMethods', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getCourts = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getCourtsTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getAddonsTable = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getAddonsTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }
  
  getAddons = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getAddons', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getOwners = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getOwnersTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getUsers = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getUsersTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getPayments = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getPaymentTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getReports = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('getReportsTable', {
        facilityId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Padel CRUD -----------------//

  //--------------- Court -----------------//

  addCourt = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('addCourtsTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateCourt = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('updateCourtsTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteCourt = (courtId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteCourtsTable', { 
        courtId 
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Addon -----------------//

  addAddon = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('addAddonsTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateAddon = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('updateAddonsTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteAddon = (addonId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteAddonsTable', { 
        addonId 
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- User -----------------//

  addUser = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('addUsersTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateUser = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('updateUsersTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteUser = (userId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteUsersTable', { 
        userId 
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Owner -----------------//

  addOwner = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('addOwnersTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateOwner = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('updateOwnersTable', fields, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteOwner = (userId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteOwnersTable', { 
        userId 
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteBooking = (bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteBooking', { 
        bookingId 
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteTransaction = (paymentId, bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('deleteTransaction', { 
        paymentId, bookingId
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  addNewPayment = (facilityId, courtId, bookingId, ccy, paidAmount, paymentCode) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('addNewPayment', {
        facilityId, courtId, bookingId, ccy, paidAmount, paymentCode
      }, false)
      .then(res => {
        const data: any = res;
        resolve(data);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }
}
