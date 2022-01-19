import { Injectable } from '@angular/core';
import { OnlineInterfaceService } from '../online-interface-service/online-interface.service';
import { StorageService } from '../storege-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalInterfaceService {
  constructor(
    private storageSrv: StorageService,
    private onlineInterfaceSrv: OnlineInterfaceService
  ) { }

  login = (username, password) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.login(username, password)
      .then(res => {
        console.log(res);
        this.storageSrv.setUser(res.content[0].userId);
        this.storageSrv.setOwner(res.content[0].ownerId);
        this.storageSrv.setMobile(res.content[0].mobile);
        this.storageSrv.setIsStaff(res.content[0].isStaff);
        this.storageSrv.setToken(res.content[0].token);
        this.storageSrv.setFacilityId(res.content[0].facilityId);
        this.storageSrv.setFacilityCcy(res.content[0].ccy);
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  logout = () => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.logout()
      .then(res => {
        this.storageSrv.signOut();
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  changePassword = (oldPassword, newPassword) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.changePassword(this.storageSrv.getOwner(), oldPassword, newPassword)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Padel Getters -----------------//

  getDashboardStatistics = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getDashboardStatistics(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getBookings = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getBookings(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getBookingsById = (bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getBookingsById(bookingId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getBookingsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getBookingsCalendar(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getCourtsCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getCourtsCalendar(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getDisabledCalendar = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getDisabledCalendar(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getPaymentMethods = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getPaymentMethods(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getCourts = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getCourts(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getAddonsTable = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getAddonsTable(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getAddons = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getAddons(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getOwners = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getOwners(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getUsers = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getUsers(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getPayments = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getPayments(facilityId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  getReports = (facilityId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.getReports(facilityId)
      .then(res => {
        resolve(res);
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
      await this.onlineInterfaceSrv.addCourt(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateCourt = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.updateCourt(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteCourt = (courtId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteCourt(courtId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Addon -----------------//

  addAddon = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.addAddon(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateAddon = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.updateAddon(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteAddon = (addonId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteAddon(addonId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- User -----------------//

  addUser = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.addUser(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateUser = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.updateUser(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteUser = (userId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteUser(userId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Owner -----------------//

  addOwner = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.addOwner(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  updateOwner = (fields) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.updateOwner(fields)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  deleteOwner = (userId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteOwner(userId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Booking -----------------//

  deleteBooking = (bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteBooking(bookingId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  //--------------- Transaction -----------------//

  deleteTransaction = (paymentId, bookingId) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.deleteTransaction(paymentId, bookingId)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }

  addNewPayment = (facilityId, courtId, bookingId, ccy, paidAmount, paymentCode) => {
    return new Promise<any>(async (resolve, reject) => {
      await this.onlineInterfaceSrv.addNewPayment(facilityId, courtId, bookingId, ccy, paidAmount, paymentCode)
      .then(res => {
        resolve(res);
      })
      .catch(async err => {
        reject(err);
      });
    });
  }
}
