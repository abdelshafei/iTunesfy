import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  albums: any[] = []; // Array to hold the albums
  artistId: string = '1'; // Example artist ID; replace with actual ID

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    // Call service to get albums by artist ID when component loads
    this.albumService.getAlbumsByArtist(this.artistId).subscribe({
      next: (data) => {
        this.albums = data;
      },
      error: (err) => {
        console.error('Failed to load albums:', err);
      }
    });
  }
}