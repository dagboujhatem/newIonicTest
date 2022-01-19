import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataTableModule } from '@pascalhonegger/ng-datatable';
import { DataTablesComponent } from './data-tables.component';
import { DataFilterPipe } from './data-tables-filter.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DataTablesComponent', () => {
  let component: DataTablesComponent;
  let fixture: ComponentFixture<DataTablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataTablesComponent, DataFilterPipe],
      imports: [ HttpClientTestingModule, DataTableModule, NoopAnimationsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
