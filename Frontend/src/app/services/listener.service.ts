import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/ownPlaylist/${localStorage.getItem('username')}`, { headers });
  }

  getLikedPlaylists(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/liked-playlists/${localStorage.getItem('username')}`, { headers });
  }
}
