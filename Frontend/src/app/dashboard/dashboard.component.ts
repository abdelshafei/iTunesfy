// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ListenerService } from '../services/listener.service';
import { ArtistService } from '../services/artist.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string | null = localStorage.getItem('userRole');
  userId: string | null = localStorage.getItem('userId'); // Assuming user ID is stored
  authId: string | null = localStorage.getItem('AuthId') 
  playlists: any[] = [];
  likedPlaylists: any[] = [];
  recommendedSongs: any[] = [];
  albums: any[] = [];
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private listenerService: ListenerService, private artistService: ArtistService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.search();
    if (this.userRole === 'listener') {
      this.loadListenerData();
    } else if (this.userRole === 'artist') {
      this.loadArtistData();
    }
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.searchService.search(this.searchTerm).subscribe({
        next: (data) => {
          this.searchResults = data;
        },
        error: (err) => {
          console.error('Search failed:', err);
        }
      });
    } else {
      this.searchResults = []; // Clear results if search term is empty
    }
  }

  loadListenerData(): void {
    if (this.userRole === 'listener') {
      this.listenerService.getPlaylists().subscribe(data => {
        this.playlists = data;
      });
    }
  }

  loadArtistData(): void {
    if (this.userRole === 'artist') {
      this.artistService.getAlbums().subscribe(data => {
        this.albums = data;
      });
    }
  }
}
