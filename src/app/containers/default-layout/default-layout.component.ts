import { Component, HostBinding } from '@angular/core';

import { navItems, navComponentItems, navStaffItems } from './_nav';
import { environment } from '../../../environments/environment'
import { StorageService } from '../../services/storege-service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  @HostBinding('class.c-app') cAppClass = true;

  public navItems = navItems;
  public navStaffItems = navStaffItems;
  public navComponentItems = navComponentItems;
  public env = environment;
  public isStaff = true;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    private storageSrv: StorageService,
  ) {
    this.isStaff = this.storageSrv.getIsStaff() === '1' ? true : false;
  }
}
