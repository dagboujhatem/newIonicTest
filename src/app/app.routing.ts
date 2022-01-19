import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent, EmailLayoutComponent } from './containers';
import { P404Component } from './views/components/error/404.component';
import { P500Component } from './views/components/error/500.component';
import { LoginComponent } from './views/components/login/login.component';
import { RegisterComponent } from './views/components/register/register.component';
import { DataTablesComponent as bookingComp } from './views/booking/data-tables.component';
import { BasicFormsComponent as bookingDetailComp } from './views/booking/bookingDetails/basic-forms.component';
import { DataTablesComponent as userComp } from './views/user/data-tables.component';
import { BasicFormsComponent as userDetailComp } from './views/user/userDetails/basic-forms.component';
import { FullCalendarNgComponent as calendarComp } from './views/calendar/data-tables.component';
import { DataTablesComponent as facilityAddonComp } from './views/facilityAddon/data-tables.component';
import { BasicFormsComponent as facilityAddonDetailsComp } from './views/facilityAddon/facilityAddonDetails/basic-forms.component';
import { DataTablesComponent as ownerComp } from './views/owner/data-tables.component';
import { BasicFormsComponent as ownerDetailsComp } from './views/owner/ownerDetails/basic-forms.component';
import { DataTablesComponent as courtComp } from './views/court/data-tables.component';
import { BasicFormsComponent as courtDetailsComp } from './views/court/courtDetails/basic-forms.component';
import { DataTablesComponent as paymentComp } from './views/payment/data-tables.component';
import { BasicFormsComponent as paymentDetailsComp } from './views/payment/paymentDetails/basic-forms.component';
import { ChangePasswordComponent as changePasswordComp } from './views/change-password/change-password.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'change-password',
    component: changePasswordComp,
    data: {
      title: 'Change Password',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'apps/email',
    component: EmailLayoutComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/components/apps/email/email.module').then((m) => m.EmailModule),
      },
    ],
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'dashboard2',
        loadChildren: () =>
          import('./views/dashboard2/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'calendar',
        component: calendarComp,
        data: {
          title: 'Calendar',
        },
      },
      {
        path: 'booking',
        component: bookingComp,
        data: {
          title: 'Bookings',
        },
        // loadChildren: () =>
        //   import('./views/user/data-tables.module').then((m) => m.DataTablesInitModule),
      },
      {
        path: 'booking/details',
        component: bookingDetailComp,
        data: {
          title: 'Booking Details'
        },
        // loadChildren: () =>
        // import('./views/user/userDetails/basic-forms.module').then(
        //   (m) => m.BasicFormsModule
        // ),
      },
      {
        path: 'facilityAddon',
        component: facilityAddonComp,
        data: {
          title: 'Addon',
        },
        // loadChildren: () =>
        //   import('./views/user/data-tables.module').then((m) => m.DataTablesInitModule),
      },
      {
        path: 'facilityAddon/details',
        component: facilityAddonDetailsComp,
        data: {
          title: 'Addon Details'
        },
        // loadChildren: () =>
        // import('./views/user/userDetails/basic-forms.module').then(
        //   (m) => m.BasicFormsModule
        // ),
      },
      {
        path: 'user',
        component: userComp,
        data: {
          title: 'Users',
        },
        // loadChildren: () =>
        //   import('./views/user/data-tables.module').then((m) => m.DataTablesInitModule),
      },
      {
        path: 'user/details',
        component: userDetailComp,
        data: {
          title: 'User Details'
        },
        // loadChildren: () =>
        // import('./views/user/userDetails/basic-forms.module').then(
        //   (m) => m.BasicFormsModule
        // ),
      },
      {
        path: 'owner',
        component: ownerComp,
        data: {
          title: 'Owners',
        },
        // loadChildren: () =>
        //   import('./views/user/data-tables.module').then((m) => m.DataTablesInitModule),
      },
      {
        path: 'owner/details',
        component: ownerDetailsComp,
        data: {
          title: 'Owner Details'
        },
        // loadChildren: () =>
        // import('./views/user/userDetails/basic-forms.module').then(
        //   (m) => m.BasicFormsModule
        // ),
      },
      {
        path: 'court',
        component: courtComp,
        data: {
          title: 'Courts',
        },
        children: [
          {
            path: 'details',
            component: courtDetailsComp,
            data: {
              title: 'Court Details'
            },
          }
        ]
      },
      {
        path: 'payment',
        component: paymentComp,
        data: {
          title: 'Payments',
        },
        // loadChildren: () =>
        //   import('./views/user/data-tables.module').then((m) => m.DataTablesInitModule),
      },
      {
        path: 'payment/details',
        component: paymentDetailsComp,
        data: {
          title: 'Payment Details'
        },
        // loadChildren: () =>
        // import('./views/user/userDetails/basic-forms.module').then(
        //   (m) => m.BasicFormsModule
        // ),
      },
      // {
      //   path: 'court/details',
      //   component: courtDetailsComp,
      //   data: {
      //     title: 'Court Details'
      //   },
      //   // loadChildren: () =>
      //   // import('./views/user/userDetails/basic-forms.module').then(
      //   //   (m) => m.BasicFormsModule
      //   // ),
      // },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/components/theme/theme.module').then((m) => m.ThemeModule),
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/components/base/base.module').then((m) => m.BaseModule),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/components/buttons/buttons.module').then((m) => m.ButtonsModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/components/chartjs/chartjs.module').then((m) => m.ChartjsModule),
      },
      {
        path: 'editors',
        loadChildren: () =>
          import('./views/components/editors/editors.module').then((m) => m.EditorsModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/components/forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'google-maps',
        loadChildren: () =>
          import('./views/components/maps/maps.module').then((m) => m.MapsModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/components/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/components/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'plugins',
        loadChildren: () =>
          import('./views/components/plugins/plugins.module').then((m) => m.PluginsModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./views/components/apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
