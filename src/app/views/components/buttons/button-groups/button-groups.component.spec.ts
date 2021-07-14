import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonGroupsComponent } from './button-groups.component';

describe('ButtonGroupsComponent', () => {
  let component: ButtonGroupsComponent;
  let fixture: ComponentFixture<ButtonGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonGroupsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
