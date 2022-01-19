import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalInterfaceService } from '../../../services/local-inteface-service/local-interface.service';

@Component({
  selector: 'app-default-header-dropdown-account',
  templateUrl: './default-header-dropdown-account.component.html',
})
export class DefaultHeaderDropdownAccountComponent implements OnInit {
  
  constructor(
    private router: Router,
    private localInterfaceSrv: LocalInterfaceService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.localInterfaceSrv.logout()
      .then(() => {
        this.router.navigate(['/login/']);
      }).catch;
  }
}
