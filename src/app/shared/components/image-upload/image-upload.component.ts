import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  imageForm: FormGroup;
  uploadedImage: File | null = null;

  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      date: ['', [Validators.required]], // Date (required)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
      this.imageForm.patchValue({
        filename: file.name, // Automatically set filename based on the selected file
      });
    }
  }

  onSubmit() {
    if (this.imageForm.valid) {
      console.log('Uploading Image:', this.imageForm.value);
      // Here you would call a service to upload the image and save its data
    } else {
      console.log('Form is invalid');
    }
  }
}
