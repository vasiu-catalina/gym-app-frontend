import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserState } from '../../states/user.state';
import { User } from '../../models/user.model';
import { AuthState } from '../../states/auth.state';
import { formatDateForInput } from '../../functions/formatDateForInput';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-info-form.component.html'
})
export class UserInfoFormComponent implements OnInit {
  userId = '';
  loading = false;
  success: string | null = null;
  error: string | null = null;

  user!: User | null;

  form !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authState: AuthState,
    private userService: UserService,
    private userState: UserState
  ) {
    effect(() => {
      this.user = this.userState.user();
      this.initForm();
    })
  }

  ngOnInit(): void {
    this.initForm();
    const userId = this.authState.getUserId() || '';
    this.userId = userId;

    this.userService.getUser(userId).subscribe({
      next: (res) => {
        const user = res['user'];
        this.userState.setUser(user);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }


  initForm() {
    this.form = this.fb.group({
      firstname: [this.user?.firstname, Validators.required],
      lastname: [this.user?.lastname, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone, Validators.required],
      birthDate: [formatDateForInput(this.user?.birthDate || new Date()), Validators.required],
      gender: [this.user?.gender, Validators.required],
    });
  }

  update(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.userService.updateUser(this.userId, this.form.value).subscribe({
      next: (res) => {
        this.success = 'Profile updated';
        this.loading = false;
        const user = res['user'];
        this.userState.setUser(user);
      },
      error: () => {
        this.error = 'Update failed';
        this.loading = false;
      }
    });
  }
}
