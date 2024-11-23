import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  albumId: string | null = null;
  albumName: string | null = null;
  songs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    // Get album ID from route
    this.albumId = this.route.snapshot.paramMap.get('albumId');
    this.albumName = this.route.snapshot.paramMap.get('albumName');
    if (this.albumId) {
      this.loadSongs();
    }
  }

  loadSongs(): void {
    this.albumService.getSongsByAlbum(this.albumId!).subscribe(
      (data) => {
        this.songs = data;
      },
      (err) => {
        console.error('Failed to load songs:', err);
      }
    );
  }
}
