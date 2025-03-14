import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-speciality',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Asegúrate de importar estos módulos
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  specialityForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    sex: [false],
    state: [false],
    ageGroupUuid: ['', Validators.required]
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('http://localhost:8080/speciality')  // Ajusta el endpoint a tu API
      .subscribe(data => {
        this.specialityForm.patchValue(data);  // Asegúrate de que la respuesta de la API coincida con las propiedades del FormGroup
      });
  }

 
  submitForm() {
    if (this.specialityForm.valid) {
      console.log('Datos enviados:', this.specialityForm.value);  // Para verificar qué se envía
  
      this.http.post('http://localhost:8080/speciality', this.specialityForm.value)
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
