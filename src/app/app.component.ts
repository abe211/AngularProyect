import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // NECESARIO PARA COMPONENTES STANDALONE
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularcuatro';

  // Creación del FormGroup
  form = new FormGroup({
    description: new FormControl(''),
    sex: new FormControl(false),
    state: new FormControl(false),
    ageGroupUuid: new FormControl('')
  });
}
