import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getPlaylists(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/playlists/ownPlaylist/${localStorage.getItem('username')}`);
  }

  getLikedPlaylists(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/playlists/liked-playlists/${localStorage.getItem('username')}`);
  }
}
