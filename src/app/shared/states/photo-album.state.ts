import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { PhotoAlbum } from '../models/photo-album.model';

@Injectable({ providedIn: 'root' })
export class PhotoAlbumState {
    private _albums = signal<PhotoAlbum[]>([]);

    setPhotoAlbums(albums: PhotoAlbum[]) {
        this._albums.set(albums);
    }

    getPhotoAlbums(): PhotoAlbum[] {
        return this._albums();
    }

    updateAlbum(updated: PhotoAlbum) {
        const current = this._albums();
        const index = current.findIndex(a => a.id === updated.id);
        if (index !== -1) {
            current[index] = updated;
            this._albums.set([...current]);
        }
    }

    addAlbum(album: PhotoAlbum) {
        const albums = this._albums();
        this._albums.set([album, ...albums]);
    }

    removeAlbum(id: string) {
        const filtered = this._albums().filter(a => a.id !== id);
        this._albums.set(filtered);
    }

    getAlbumById(id: string): PhotoAlbum | undefined {
        return this._albums().find(a => a.id === id);
    }

    clearPhotoAlbum() {
        this._albums.set([]);
    }
}
