import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListenerService } from '../services/listener.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent {
  playlistName: string | null = null;
  userId: string | null = null;
  songs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private listenerService: ListenerService
  ) {}

  ngOnInit(): void {
    // Get album ID from route
    this.playlistName = this.route.snapshot.paramMap.get('playlistName');
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.playlistName) {
      this.loadSongs();
    }
  }

  loadSongs(): void {
    this.listenerService.getSongsByPlaylist(this.playlistName!, this.userId!).subscribe(
      (data) => {
        this.songs = data;
      },
      (err) => {
        console.error('Failed to load songs:', err);
      }
    );
  }
}
