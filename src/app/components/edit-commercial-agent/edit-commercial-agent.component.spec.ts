import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommercialAgentComponent } from './edit-commercial-agent.component';

describe('EditCommercialAgentComponent', () => {
  let component: EditCommercialAgentComponent;
  let fixture: ComponentFixture<EditCommercialAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommercialAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommercialAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
