import { Routes } from '@angular/router';
import { SpecialityComponent } from './speciality/speciality.component';
import { AgeGroupComponent } from './agegroup/agegroup.component';
import { DoctorComponent } from './doctor/doctor.component';
import { StateAppointmentComponent} from './state-appointment/state-appointment.component'
import { MedicalComponent } from './medical/medical.component';


export const routes: Routes = [
  { path: 'speciality', component: SpecialityComponent },
  { path: 'agegroup', component: AgeGroupComponent },
  { path: 'doctor', component: DoctorComponent},
  { path: 'state-appointment', component: StateAppointmentComponent},
  { path: 'medical', component: MedicalComponent}
];
