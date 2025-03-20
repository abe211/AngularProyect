import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-agegroup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Asegúrate de importar estos módulos
  templateUrl: './agegroup.component.html',
  styleUrls: ['./agegroup.component.css']
})
export class AgeGroupComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  agegroupForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    state: [false],

  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('http://localhost:8080/age-group')  // Ajusta el endpoint a tu API
      .subscribe(data => {
        this.agegroupForm.patchValue(data);  // Asegúrate de que la respuesta de la API coincida con las propiedades del FormGroup
      });
  }
  ageGroups: any[] = []; 
  submitForm() {
    if (this.agegroupForm.valid) {
      console.log('Datos enviados:', this.agegroupForm.value);  // Para verificar qué se envía

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/age-group', this.agegroupForm.value, { headers })
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
