import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

import { CodeEditorsComponent } from './code-editors.component';

describe('CodeEditorsComponent', () => {
  let component: CodeEditorsComponent;
  let fixture: ComponentFixture<CodeEditorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeEditorsComponent ],
      imports: [AceEditorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
