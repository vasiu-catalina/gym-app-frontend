import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OffcanvasComponent } from "./shared/components/offcanvas/offcanvas.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OffcanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gym-app-frontend';
}
