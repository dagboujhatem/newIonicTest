import { Component, HostBinding } from '@angular/core';

import { navItems, navComponentItems } from './_nav';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  @HostBinding('class.c-app') cAppClass = true;

  public navItems = navItems;
  public navComponentItems = navComponentItems;
  public env = environment;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
