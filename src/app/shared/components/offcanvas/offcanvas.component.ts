import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthState } from '../../states/auth.state';

@Component({
  selector: 'app-offcanvas',
  imports: [RouterModule],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css'
})
export class OffcanvasComponent {

  constructor(private authState: AuthState, private router: Router) {}

  logout() {
    this.authState.clearToken();
    this.router.navigate(['/login']);
  }
}
