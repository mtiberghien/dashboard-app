import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditComponent } from './cell-edit.component';

describe('CellEditComponent', () => {
  let component: CellEditComponent;
  let fixture: ComponentFixture<CellEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
