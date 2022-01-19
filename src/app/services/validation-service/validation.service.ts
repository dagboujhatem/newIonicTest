import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storege-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private router: Router,
    private storageSrv: StorageService
  ) {
  }

  ngOnInit(): void {
  }

  validateAcess() {
    return new Promise<any>((resolve, reject) => {
      const token = this.storageSrv.getToken();
      if (!token) {
        reject(false);
        this.router.navigate(['/login/'])
      }
      resolve(true);
    });
  }
  
  validateNumber(n) {
    const re = /^-?[\d.]+(?:e-?\d+)?$/;
    return re.test(n);
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(email) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(email);
  }

  validateIBAN(input) {
    const CODE_LENGTHS = {
        AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
        CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
        FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
        HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
        LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
        MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
        RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };

    const iban = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
    let digits;

    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
        return false;
    }

    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter =>  {
        return letter.charCodeAt(0) - 55;
    }));

    return this.mod97(digits);
  }
  mod97(val) {
    let checksum = val.slice(0, 2);
    let fragment;

    for (let offset = 2; offset < val.length; offset += 7) {
        fragment = checksum + val.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
}
}
