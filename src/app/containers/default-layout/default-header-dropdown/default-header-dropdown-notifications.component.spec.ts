import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultHeaderDropdownNotificationsComponent } from './default-header-dropdown-notifications.component';

describe('DefaultHeaderDropdownNotificationsComponent', () => {
  let component: DefaultHeaderDropdownNotificationsComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownNotificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownNotificationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      DefaultHeaderDropdownNotificationsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
