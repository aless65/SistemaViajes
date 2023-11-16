import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTableComponent } from './advanced-table.component';

describe('AdvancedTableComponent', () => {
  let component: AdvancedTableComponent;
  let fixture: ComponentFixture<AdvancedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedTableComponent]
    });
    fixture = TestBed.createComponent(AdvancedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
