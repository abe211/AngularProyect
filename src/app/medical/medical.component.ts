import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.css']
})

export class MedicalComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  medicalForm: FormGroup = this.fb.group({
    scheduledFor: ['', Validators.required],
    reason: ['', Validators.required],
    stateAppointmentUuid: ['', Validators.required],
    doctorUuid: ['', Validators.required],
    assistant: [''],
    state: [false]
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('http://localhost:8080/medical-appointment')  // Ajusta el endpoint a tu API
      .subscribe(data => {
        this.medicalForm.patchValue(data);  // Asegúrate de que la respuesta de la API coincida con las propiedades del FormGroup
      });
  }

  submitForm() {
    if (this.medicalForm.valid) {
      // Convertir datetime-local a Timestamp (milisegundos desde 1970)
      const formData = { ...this.medicalForm.value };
      formData.scheduledFor = new Date(formData.scheduledFor).getTime(); // Convertir a timestamp

      console.log('Datos enviados:', formData);

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/medical-appointment', formData, { headers })
        .subscribe({
          next: (response) => {
            console.log('Formulario enviado:', response);
            alert('Cita médica registrada correctamente');
          },
          error: (error) => {
            console.error('Error al enviar el formulario:', error);
            alert(`Hubo un error al enviar el formulario. Código: ${error.status}, Mensaje: ${error.message}`);
          }
        });
    } else {
      alert('Formulario no válido');
    }
  }
}
