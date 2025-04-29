import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  createAlbum(userId: string, albumData: any) {
    return this.http.post(`${this.url}/${userId}/photo-albums`, albumData);
  }

  getAllAlbums(userId: string) {
    return this.http.get(`${this.url}/${userId}/photo-albums`);
  }

  getAlbum(userId: string, albumId: string) {
    return this.http.get(`${this.url}/${userId}/photo-albums/${albumId}`);
  }

  renameAlbum(userId: string, albumId: string, data: any) {
    return this.http.patch(`${this.url}/${userId}/photo-albums/${albumId}`, data);
  }

  deleteAlbum(userId: string, albumId: string) {
    return this.http.delete(`${this.url}/${userId}/photo-albums/${albumId}`);
  }

  uploadImage(userId: string, albumId: string, formData: FormData) {
    return this.http.post(`${this.url}/${userId}/photo-albums/${albumId}/images`, formData);
  }

  deleteImages(userId: string, albumId: string, data: any) {
    return this.http.put(`${this.url}/${userId}/photo-albums/${albumId}/images`, data);
  }
}
