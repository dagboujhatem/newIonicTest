import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsComponent } from './alerts/alerts.component';
import { BadgesComponent } from './badges/badges.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications',
    },
    children: [
      {
        path: '',
        redirectTo: 'alerts',
      },
      {
        path: 'alerts',
        component: AlertsComponent,
        data: {
          title: 'Alerts',
        },
      },
      {
        path: 'badges',
        component: BadgesComponent,
        data: {
          title: 'Badges',
        },
      },
      {
        path: 'modals',
        component: ModalsComponent,
        data: {
          title: 'Modals',
        },
      },
      {
        path: 'toasters',
        component: ToastersComponent,
        data: {
          title: 'Toasters',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
