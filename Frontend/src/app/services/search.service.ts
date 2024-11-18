import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  // Search function that sends the search term to the backend
  search(term: string): Observable<any[]> {

    const token = localStorage.getItem('authToken'); // Get the token from storage
    if (!token) {
      console.error("Auth token is missing in localStorage.");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`, // Format: Bearer <token>
    };
    return this.http.get<any[]>(`${this.apiUrl}/search/${term}`, { headers });
  }
}
