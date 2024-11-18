import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Search function that sends the search term to the backend
  search(term: string): Observable<any[]> {
    const params = new HttpParams().set('q', term);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}
