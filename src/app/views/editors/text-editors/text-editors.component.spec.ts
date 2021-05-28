import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextEditorsComponent } from './text-editors.component';

describe('TextEditorsComponent', () => {
  let component: TextEditorsComponent;
  let fixture: ComponentFixture<TextEditorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextEditorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
