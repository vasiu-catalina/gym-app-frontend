import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';
import { PhotoAlbumState } from '../../shared/states/photo-album.state';
import { PhotoAlbum } from '../../shared/models/photo-album.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from "../../shared/components/image-upload/image-upload.component";
import { environment } from '../../../environments/environment';
import { PhotoAlbumService } from '../../shared/services/photo-album.service';

@Component({
  selector: 'app-photo-album-view',
  imports: [CommonModule, FormsModule, ImageUploadComponent, RouterModule],
  templateUrl: './photo-album-view.component.html',
  styleUrl: './photo-album-view.component.css'
})
export class PhotoAlbumViewComponent implements OnInit {


  @ViewChild(ImageUploadComponent) imageUpload !: ImageUploadComponent;


  imageUrl = `${environment.api}/images`

  userId = '';
  photoAlbumId = '';
  photoAlbum !: PhotoAlbum;

  showImageModal = false;

  selectMode = false;
  selectedImages: { [id: string]: boolean } = {};


  constructor(private route: ActivatedRoute, private authState: AuthState,
    private photoAlbumState: PhotoAlbumState,
    private photoAlbumService: PhotoAlbumService
  ) {
    effect(() => {
      this.userId = this.authState.getUserId() || '';
    })

    effect(() => {
      this.photoAlbumId = this.route.snapshot.paramMap.get('id') || '';
      this.photoAlbum = this.photoAlbumState.getAlbumById(this.photoAlbumId)!;
      this.photoAlbum.images = this.photoAlbum.images.map(img => ({ ...img, error: false }));
    })
  }

  ngOnInit(): void {
  }


  goBack() {
    history.back();
  }

  toggleSelectMode() {
    this.selectMode = true;
    this.selectedImages = {};
  }

  toggleSelectImage(id: string) {
    if (this.selectedImages[id]) {
      this.selectedImages[id] = false;
    } else {
      this.selectedImages[id] = true;
    }
  }

  cancelSelectMode() {
    this.selectMode = false;
  }

  confirmBulkDelete() {
    const imageIds = Object.entries(this.selectedImages)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);

    this.deleteImages(imageIds);
    console.log('Images to delete:', imageIds);

  }

  openUploadModal() {
    console.log('Open crop/upload modal');
    this.imageUpload.openFileDialog();

  }

  deleteImages(imageIds: string[]) {
    this.photoAlbumService.deleteImages(this.userId, this.photoAlbum.id, { imageIds }).subscribe({
      next: (res) => {
        this.photoAlbum = res.album;
        this.photoAlbumState.updateAlbum(res.album);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.selectMode = false;
  }

}
