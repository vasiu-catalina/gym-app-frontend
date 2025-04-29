import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserState } from '../../states/user.state';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {
  userId = '';
  loading = false;
  success: string | null = null;
  error: string | null = null;

  form !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userState: UserState,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.form  = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

    const user = this.userState.getUser();
    if (user) this.userId = user.id;
  }

  changePassword(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.userService.changePassword(this.userId, this.form.value).subscribe({
      next: () => {
        this.success = 'Password changed';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Change failed';
        this.loading = false;
      }
    });
  }
}
