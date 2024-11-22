import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getSongsByAlbum(albumId: string): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };

    return this.http.get<any[]>(`${this.apiUrl}/albums/${albumId}`, { headers });
  }
}