import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-album-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './photo-album-form.component.html',
  styleUrls: ['./photo-album-form.component.css']
})
export class PhotoAlbumFormComponent implements OnInit {

  albumForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name field (required and minimum 3 characters)
    });
  }

  onSubmit() {
    if (this.albumForm.valid) {
      const albumData = this.albumForm.value;
      console.log('Creating Photo Album:', albumData);
      // Here you would call a service to create the album in the backend
    } else {
      console.log('Form is invalid');
    }
  }
}
