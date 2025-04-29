import { Injectable, signal } from '@angular/core';
import { PhotoAlbum } from '../models/photo-album.model';

@Injectable({ providedIn: 'root' })
export class PhotoAlbumState {
    private _photoAlbum = signal<PhotoAlbum | null>(null);

    setPhotoAlbum(album: PhotoAlbum) {
        this._photoAlbum.set(album);
    }

    getPhotoAlbum(): PhotoAlbum | null {
        return this._photoAlbum();
    }

    clearPhotoAlbum() {
        this._photoAlbum.set(null);
    }
}
