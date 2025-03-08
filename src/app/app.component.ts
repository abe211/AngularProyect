import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // NECESARIO PARA COMPONENTES STANDALONE
  imports: [RouterOutlet, ReactiveFormsModule,JsonPipe], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Cambié `styleUrl` a `styleUrls`
})
export class AppComponent {
  title = 'angularcuatro';

  // Creación del FormGroup con FormControl y signal()
  form = signal(
    new FormGroup({
      description: new FormControl(''),
      sex: new FormControl(false),
      state: new FormControl(false),
      ageGroupUuid: new FormControl('')
    })
  );
}
