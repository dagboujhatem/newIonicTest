import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaObjectsComponent } from './media-objects.component';

describe('MediaObjectsComponent', () => {
  let component: MediaObjectsComponent;
  let fixture: ComponentFixture<MediaObjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
