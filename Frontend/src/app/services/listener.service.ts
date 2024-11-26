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

  getSongsByPlaylist(playlistName: string, userId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/${playlistName}/${userId}`, { headers });
  }

  incrementPlayCount(playlistName: string, userId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };
    
    return this.http.get<any[]>(`${this.apiUrl}/playlists/incPlayCount/${playlistName}/${userId}`, { headers });
  }

  addSongs(songId: string, playlistName: string, userId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/addSong/${songId}/${playlistName}/${userId}`, { headers });
  }

  removeSongs(songId: string, playlistName: string, userId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/removeSong/${songId}/${playlistName}/${userId}`, { headers });
  }

  createPlaylist(playlistName: string, UserId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/createPlaylist/${playlistName}/${UserId}`, { headers });
  }

  removePlaylist(playlistName: string, UserId: string) : Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/playlists/removePlaylist/${playlistName}/${UserId}`, { headers });
  }

  //'/removePlaylist/:playlistName/:UserId'
}
