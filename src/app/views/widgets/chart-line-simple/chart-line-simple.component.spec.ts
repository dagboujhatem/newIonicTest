import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartLineSimpleComponent } from './chart-line-simple.component';

describe('ChartLineSimpleComponent', () => {
  let component: ChartLineSimpleComponent;
  let fixture: ComponentFixture<ChartLineSimpleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChartLineSimpleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
