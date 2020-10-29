import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialAgentsComponent } from './commercial-agents.component';

describe('CommercialAgentsComponent', () => {
  let component: CommercialAgentsComponent;
  let fixture: ComponentFixture<CommercialAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
