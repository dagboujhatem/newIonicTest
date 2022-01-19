import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_ID = 'auth-user';
const OWNER_ID = 'auth-owner';
const USER_MOBILE = 'auth-mobile';
const IS_STAFF = 'auth-isstaff';
const FACILITY_ID = 'auth-facilityId';
const FACILITY_CCY = 'auth-facilityCcy';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  isLoggedin() {
    return new Promise<any>((resolve) => {
      if(this.getToken() != null) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    });
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  getFacilityId(): string | null {
    return window.sessionStorage.getItem(FACILITY_ID);
  }

  setFacilityId(facilityId: any): void {
    window.sessionStorage.removeItem(FACILITY_ID);
    window.sessionStorage.setItem(FACILITY_ID, facilityId);
  }

  getFacilityCcy(): string | null {
    return window.sessionStorage.getItem(FACILITY_CCY);
  }

  setFacilityCcy(ccy: any): void {
    window.sessionStorage.removeItem(FACILITY_CCY);
    window.sessionStorage.setItem(FACILITY_CCY, ccy);
  }

  setUser(user: any): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_ID);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  setOwner(owner: any): void {
    window.sessionStorage.removeItem(OWNER_ID);
    window.sessionStorage.setItem(OWNER_ID, JSON.stringify(owner));
  }

  getOwner(): any {
    const owner = window.sessionStorage.getItem(OWNER_ID);
    if (owner) {
      return JSON.parse(owner);
    }
    return {};
  }
  setMobile(mobile: string): void {
    window.sessionStorage.removeItem(USER_MOBILE);
    window.sessionStorage.setItem(USER_MOBILE, mobile);
  }
  getMobile(): string | null {
    return window.sessionStorage.getItem(USER_MOBILE);
  }

  setIsStaff(isStaff: string): void {
    window.sessionStorage.removeItem(IS_STAFF);
    window.sessionStorage.setItem(IS_STAFF, isStaff);
  }
  getIsStaff(): string | null {
    return window.sessionStorage.getItem(IS_STAFF);
  }

}
