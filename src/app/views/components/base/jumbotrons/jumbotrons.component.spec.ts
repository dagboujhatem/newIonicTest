import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JumbotronsComponent } from './jumbotrons.component';

describe('JumbotronsComponent', () => {
  let component: JumbotronsComponent;
  let fixture: ComponentFixture<JumbotronsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JumbotronsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumbotronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
