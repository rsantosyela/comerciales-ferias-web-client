import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFairComponent } from './edit-fair.component';

describe('EditFairComponent', () => {
  let component: EditFairComponent;
  let fixture: ComponentFixture<EditFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
