import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetsBrandComponent } from './widgets-brand.component';

describe('WidgetsBrandComponent', () => {
  let component: WidgetsBrandComponent;
  let fixture: ComponentFixture<WidgetsBrandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetsBrandComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
