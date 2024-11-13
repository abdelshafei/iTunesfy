import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPlaylists(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/playlists/ownPlaylist/${userId}`);
  }

  getLikedPlaylists(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/playlists/liked-playlists/${userId}`);
  }
}
