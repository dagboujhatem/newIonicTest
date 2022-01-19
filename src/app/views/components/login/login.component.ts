import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LocalInterfaceService } from '../../../services/local-inteface-service/local-interface.service';
import { StorageService } from '../../../services/storege-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';

  public isLoading = false;
  public errMsg = '';
  public mobile = null;
  public password = null;
  public isOwner = 'Y';

  constructor(
    private router: Router,
    private storageSrv: StorageService,
    private localInterfaceSrv: LocalInterfaceService,
  ) {

  }

  async ngOnInit() {
    if (await this.storageSrv.isLoggedin()) {
      if (this.storageSrv.getIsStaff() == '1')
      {
        this.goToDashboard();
      }
      else
      {
        this.goToCalendar();
      }
    }
  }

  goToDashboard = () => {
    this.router.navigate(['/dashboard']);
  }
  goToCalendar = () => {
    this.router.navigate(['/calendar']);
  }

  goToForceChangePassword = () => {
    this.router.navigate(['/change-password/']);
  }

  login = async () => {

    if (await this.validateInput()) {
      this.isLoading = true;
      this.localInterfaceSrv.login(this.mobile, this.password)
      .then(res => {
        if (res.content[0].forceChangePassword == 1) 
        {
          this.goToForceChangePassword();
        }
        else 
        {
          console.log("res.content[0].isStaff" + res.content[0].isStaff)
          if (res.content[0].isStaff == 1)
          {
            this.goToCalendar();
          }
          else
          {
            this.goToDashboard();
          }
        }
      })
      .catch(err => { this.errMsg = err.desc; })
      .finally(() => { this.isLoading = false; });
    }
  }

  validateInput() {
    return new Promise<any>((resolve) => {
      this.errMsg = '';
      if (!this.mobile || this.mobile.trim() === '') {
        this.errMsg = 'Please enter a valid mobile';
        resolve(false);
      }
      else if (!this.password || this.password.trim() === '') {
        this.errMsg = 'Please enter a password';
        resolve(false);
      }
      else {
        resolve(true);  
      }
    });
  }
}
