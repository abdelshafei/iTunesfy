import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Method to get albums by artist ID
  getAlbumsByArtist(authentication_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/albums/artist/${authentication_id}`);
  }
}
