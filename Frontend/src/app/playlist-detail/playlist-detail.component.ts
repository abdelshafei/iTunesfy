import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListenerService } from '../services/listener.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent {
  currUserId: string | null = localStorage.getItem('UserId')
  playlistName: string | null = null;
  userId: string | null = null;
  songs: any[] = [];
  isPlaying: boolean = false;
  searchTerm: string = '';
  searchResults: any[] = []

  constructor(
    private route: ActivatedRoute,
    private listenerService: ListenerService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Get album ID from route
    this.searchSongs();
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
        console.log(data)
      },
      (err) => {
        console.error('Failed to load songs:', err);
      }
    );
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.incrementPlayCounter();
    }
  }

  incrementPlayCounter(): void {
    console.log("Playlist Name: ", this.playlistName);
    console.log("user Id: ", this.userId)
    this.listenerService.incrementPlayCount(this.playlistName!, this.userId!).subscribe({
      next: () => console.log('Play count incremented!'),
      error: (err) => console.error('Failed to increment play count', err)
    });
  }

  searchSongs(): void {
    if(this.searchTerm.trim()) {
      this.searchService.searchSongs(this.playlistName!, this.userId!, this.searchTerm).subscribe({
        next: (data) => {
          this.searchResults = data;
          console.log(data)
        },
        error: (err) => {
          console.error('Search failed:', err);
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  addSong(songId: string): void {
    this.listenerService.addSongs(songId, this.playlistName!, this.userId!).subscribe({
      next: (data) => {
        this.loadSongs();
      },
      error: (err) => {
        console.error('Song Adding Failed:', err);
      }
    });
  }

  removeSongs(songId: string): void {
    this.listenerService.removeSongs(songId, this.playlistName!, this.userId!).subscribe({
      next: (data) => {
        this.loadSongs();
      },
      error: (err) => {
        console.error('Song Adding Failed:', err);
      }
    });
  }
}
