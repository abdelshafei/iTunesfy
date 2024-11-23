import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent {
  artistId: string | null = null;
  artistName: string | null = null;
  albums: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('artistId');
    this.artistName = this.route.snapshot.paramMap.get('artistName');
    if (this.artistId) {
      this.loadAlbums();
    }
  }

  loadAlbums(): void {
    this.artistService.getAlbumsByArtist(this.artistId!).subscribe(
      (data) => {
        this.albums = data;
      },
      (err) => {
        console.error('Failed to load songs:', err);
      }
    );
  }
}
