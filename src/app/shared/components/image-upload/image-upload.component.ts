import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { PhotoAlbumState } from '../../states/photo-album.state';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { AuthState } from '../../states/auth.state';
import { PhotoAlbum } from '../../models/photo-album.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent, ReactiveFormsModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {


  @Input() photoAlbum !: PhotoAlbum;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dateTimeForm !: FormGroup;

  userId = '';
  imageChangedEvent: any = '';
  croppedImage: string = '';
  showCropper = false;
  isImageCropped = false;
  croppedBlob: Blob | null = null;

  constructor(
    private fb: FormBuilder,
    private photoAlbumState: PhotoAlbumState,
    private photoAlbumService: PhotoAlbumService,
    private authState: AuthState) {
    effect(() => {
      this.userId = this.authState.getUserId() || '';
    })
  }

  ngOnInit(): void {
    this.dateTimeForm = this.fb.group({
      datetime: ['', Validators.required]
    });
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }


  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageChangedEvent = event;
      this.showCropper = true;
      this.isImageCropped = false;
    } else {
      console.warn('Invalid file input:', event);
    }
  }

  onImageCropped(event: ImageCroppedEvent): void {
    if (!event.blob) {
      console.warn('No blob from cropper:', event);
      return;
    }

    this.croppedImage = URL.createObjectURL(event.blob);
    this.croppedBlob = event.blob;
    this.isImageCropped = true;
  }


  cancelCrop(): void {
    this.showCropper = false;
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.isImageCropped = false;
  }

  uploadCroppedImage(): void {

    if (this.dateTimeForm.invalid) {
      alert('Please provide a valid date!');
      this.dateTimeForm.markAllAsTouched();
      return;
    }

    if (!this.croppedBlob) {
      alert('Please crop the image before uploading.');
      return;
    }

    const datetimeValue = this.dateTimeForm.value.datetime;

    const formData = new FormData();
    formData.append('image', this.croppedBlob, 'profile.png');
    formData.append('date', datetimeValue);
    this.photoAlbumService.uploadImage(this.userId, this.photoAlbum.id, formData).subscribe({
      next: (res) => {
        console.log(res.album);
        this.photoAlbum = res.album;
        this.photoAlbumState.updateAlbum(res.album);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.cancelCrop();
  }
}
