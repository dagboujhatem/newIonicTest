import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailToolbarComponent } from './mail-toolbar.component';

describe('MailToolbarComponent', () => {
  let component: MailToolbarComponent;
  let fixture: ComponentFixture<MailToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MailToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
