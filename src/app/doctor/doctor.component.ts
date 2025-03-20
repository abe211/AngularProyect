import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Asegúrate de importar estos módulos
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  doctorForm: FormGroup = this.fb.group({
    specialtyUuid: ['', Validators.required],
    license: ['', Validators.required],
    state: [false]

  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('http://localhost:8080/doctor')  // Ajusta el endpoint a tu API
      .subscribe(data => {
        this.doctorForm.patchValue(data);  
      });
  }
  doctors: any[] = []; 
  submitForm() {
    if (this.doctorForm.valid) {
      console.log('Datos enviados:', this.doctorForm.value);  // Para verificar qué se envía

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/doctor', this.doctorForm.value, { headers })
        .subscribe({
          next: (response) => {
            console.log('Formulario enviado:', response);
            alert('Formulario enviado correctamente');
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
