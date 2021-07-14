import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationsComponent } from './paginations.component';

describe('PaginationsComponent', () => {
  let component: PaginationsComponent;
  let fixture: ComponentFixture<PaginationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
