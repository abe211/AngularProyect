import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAppointmentComponent } from './state-appointment.component';

describe('StateAppointmentComponent', () => {
  let component: StateAppointmentComponent;
  let fixture: ComponentFixture<StateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
