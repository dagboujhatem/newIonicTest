import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LocalInterfaceService } from '../../services/local-inteface-service/local-interface.service';
import { ValidationService } from '../../services/validation-service/validation.service';
import { StorageService } from '../../services/storege-service/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
})
export class ChangePasswordComponent {
  @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';

  public isLoading = false;
  public errMsg = '';
  public oldPass = null;
  public newPass = null;
  public confirmPass = null;

  constructor(
    private router: Router,
    private validationSrv: ValidationService,
    private localInterfaceSrv: LocalInterfaceService,
    private storageSrv: StorageService,
  ) {
  }

  goToDashboard = () => {
    this.router.navigate(['/dashboard/']);
  }

  goToCalendar = () => {
    this.router.navigate(['/calendar']);
  }

  changePassword = async () => {
    await this.validateInput()
      .then(async val => {
        this.isLoading = true;
        this.localInterfaceSrv.changePassword(this.oldPass, this.newPass)
        .then(res => {
          if (this.storageSrv.getIsStaff() === '1')
          {
            this.goToCalendar();
          }
          else
          {
            this.goToDashboard();
          }
        })
        .catch(err => { this.errMsg = err.desc; })
        .finally(() => { this.isLoading = false; });
      });
  }

  validateInput() {
    return new Promise<any>((resolve, reject) => {
      this.errMsg = '';
      if (!this.oldPass || this.oldPass.trim() === '') {
        this.errMsg = 'Please enter your current password';
        reject('validateInput');
      }
      if (!this.newPass || this.newPass.trim() === '') {
        this.errMsg = 'Please enter a new password';
        reject('validateInput');
      }
      if (!this.confirmPass || this.confirmPass.trim() === '') {
        this.errMsg = 'Please enter a new password';
        reject('validateInput');
      }
      if (this.newPass != this.confirmPass) {
        this.errMsg = 'New password and confirm password does not match';
        reject('validateInput');
      }
      if (this.newPass.length < 8)
      {
        this.errMsg = 'New pasword has to be at least 8 characters';
        reject('validateInput');
      }
      else {
        resolve(true);  
      }
    });
  }
}
