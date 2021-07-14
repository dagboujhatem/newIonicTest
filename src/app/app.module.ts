import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { DefaultHeaderComponent } from './containers/default-layout/default-header/default-header.component';
import { DefaultHeaderDropdownAccountComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-account.component';
import { DefaultHeaderDropdownMessagesComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-messages.component';
import { DefaultHeaderDropdownNotificationsComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-notifications.component';
import { DefaultHeaderDropdownTasksComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-tasks.component';
import { DefaultAsideComponent } from './containers/default-layout/default-aside/default-aside.component';
// Import email
import { EmailLayoutComponent } from './containers';
import { EmailHeaderComponent } from './containers/email-layout/email-header/email-header.component';

// Import error pages
import { P404Component } from './views/components/error/404.component';
import { P500Component } from './views/components/error/500.component';
// Import pages
import { LoginComponent } from './views/components/login/login.component';
import { RegisterComponent } from './views/components/register/register.component';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


// Routing

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';


export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DefaultHeaderComponent,
  DefaultHeaderDropdownAccountComponent,
  DefaultHeaderDropdownMessagesComponent,
  DefaultHeaderDropdownNotificationsComponent,
  DefaultHeaderDropdownTasksComponent,
  DefaultAsideComponent,
  EmailLayoutComponent,
  EmailHeaderComponent,
];

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  BreadcrumbModule,
  CardModule,
  CalloutModule,
  ChartModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  LayoutModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SwitchModule,
  TabsetModule,
  TogglerModule,
  ToastModule,
  TextMaskModule,
  SpinkitModule,
  SpinnerModule,
  ModalModule,
} from '@coreui/angular';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

// 3rd party
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesComponent as userComp } from './views/user/data-tables.component';
import { BasicFormsComponent as userDetailsComp } from './views/user/userDetails/basic-forms.component';
//import { DataTablesInitModule } from './views/user/data-tables.module';
import { DataTableModule } from '@pascalhonegger/ng-datatable';
import { DataFilterPipe } from './views/user/data-tables-filter.pipe';
import { AppToastComponent as ToastComp } from './services/shared-service/toast-simple/toast.component'

@NgModule({
    imports: [
        AlertModule,
        BadgeModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        BreadcrumbModule,
        CardModule,
        CalloutModule,
        ChartModule,
        CollapseModule,
        DropdownModule,
        GridModule,
        IconModule,
        IconSetModule.forRoot(),
        SharedModule,
        LayoutModule,
        ListGroupModule,
        ProgressModule,
        SidebarModule,
        SwitchModule,
        TabsetModule,
        TogglerModule,
        ToasterModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        // ToastrModule.forRoot(),
        // ToastContainerModule,
        FormModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}}),
        //TranslateModule,
        ToastModule,
        BsDatepickerModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        TimepickerModule,
        PopoverModule,
        FormsModule,
        ModalModule,
        SpinkitModule,
        SpinnerModule,
        DataTableModule
    ],
  exports: [SharedModule, BsDatepickerModule],

  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    DataFilterPipe,
    userComp,
    userDetailsComp,
    ToastComp
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    FormBuilder,
    Title,
    // TranslateService,
    // {
    //   provide: TranslateLoader,
    //   useFactory: TranslationLoaderFactory,
    //   deps: [HttpClient]
    // },
    // TranslateStore,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
