import { Component, effect } from '@angular/core';
import { PhotoAlbumService } from '../../shared/services/photo-album.service';
import { PhotoAlbumState } from '../../shared/states/photo-album.state';
import { AuthState } from '../../shared/states/auth.state';
import { PhotoAlbum } from '../../shared/models/photo-album.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-albums',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './photo-albums.component.html',
  styleUrl: './photo-albums.component.css'
})
export class PhotoAlbumsComponent {

  userId = '';
  photoAlbums: PhotoAlbum[] = [];

  editingAlbumId: string | null = null;
  editedAlbumName: string = '';
  selectedAlbumToDeleteId: string | null = null;

  newAlbumName: string = '';
  imageUrl = `${environment.api}/images`;


  constructor(
    private photoAlbumService: PhotoAlbumService,
    private photoAlbumState: PhotoAlbumState,
    private authState: AuthState,
    private router: Router
  ) {
    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.fetchPhotoAlbums();
      }
    });

    effect(() => {
      this.photoAlbums = this.photoAlbumState.getPhotoAlbums();
    });
  }

  viewAlbum(id: string) {
    this.router.navigate(['/photo-albums', id]);
  }

  startEditing(album: PhotoAlbum, event: MouseEvent) {
    event.stopPropagation();
    this.editingAlbumId = album.id;
    this.editedAlbumName = album.name;
  }

  cancelEdit() {
    this.editingAlbumId = null;
    this.editedAlbumName = '';
  }


  openDeleteModal(albumId: string, event: MouseEvent) {
    event.stopPropagation();
    this.selectedAlbumToDeleteId = albumId;
  }

  cancelDelete() {
    this.selectedAlbumToDeleteId = null;
  }

  cancelCreateAlbum() {
    this.newAlbumName = '';
  }

  createAlbum() {
    if (!this.newAlbumName.trim()) return;

    const payload = { name: this.newAlbumName.trim() };

    this.photoAlbumService.createAlbum(this.userId, payload).subscribe({
      next: (res) => {
        this.photoAlbumState.addAlbum(res.album);
        this.newAlbumName = '';
      },
      error: err => {
        console.error('Failed to create album:', err);
      }
    });
  }

  fetchPhotoAlbums() {
    this.photoAlbumService.getAllAlbums(this.userId).subscribe({
      next: (res) => {
        this.photoAlbumState.setPhotoAlbums(res.albums);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveAlbumName(album: PhotoAlbum) {
    const updated = { ...album, name: this.editedAlbumName };
    this.photoAlbumService.renameAlbum(this.userId, album.id, { name: this.editedAlbumName }).subscribe({
      next: () => {
        this.photoAlbumState.updateAlbum(updated);
        this.cancelEdit();
      },
      error: err => console.error(err)
    });
  }

  confirmDelete() {
    if (!this.selectedAlbumToDeleteId) return;
    this.photoAlbumService.deleteAlbum(this.userId, this.selectedAlbumToDeleteId).subscribe({
      next: () => {
        this.photoAlbumState.removeAlbum(this.selectedAlbumToDeleteId!);
        this.selectedAlbumToDeleteId = null;
      },
      error: err => console.error(err)
    });
  }


}
