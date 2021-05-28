import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultHeaderDropdownAccountComponent } from './default-header-dropdown-account.component';

describe('DefaultHeaderDropdownAccountComponent', () => {
  let component: DefaultHeaderDropdownAccountComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeaderDropdownAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
