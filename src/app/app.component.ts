import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OffcanvasComponent } from "./shared/components/offcanvas/offcanvas.component";
import { AuthState } from './shared/states/auth.state';
import { UserState } from './shared/states/user.state';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OffcanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gym-app-frontend';

  constructor(private authState: AuthState, private userState: UserState, private userService: UserService) {

    effect(() => {

      if (this.authState.isLoggedIn()) {
        const userId = this.authState.getUserId() || '';
        this.userService.getUser(userId).subscribe({
          next: (res) => {
            this.userState.setUser(res.user);
            console.log(res.user)
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    })
  }
}
