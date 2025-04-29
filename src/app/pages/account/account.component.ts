import { Component, OnInit } from '@angular/core';
import { UserInfoFormComponent } from "../../shared/components/user-info-form/user-info-form.component";
import { ChangePasswordFormComponent } from "../../shared/components/change-password-form/change-password-form.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [UserInfoFormComponent, ChangePasswordFormComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

}
