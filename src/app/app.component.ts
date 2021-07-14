import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import {TranslateService} from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
  styleUrls: ['../scss/vendors/toastr/toastr.scss', "../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",],

})
export class AppComponent implements OnInit {
  constructor(private router: Router, public iconSet: IconSetService, public translateService: TranslateService) {
    // iconSet singleton
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
