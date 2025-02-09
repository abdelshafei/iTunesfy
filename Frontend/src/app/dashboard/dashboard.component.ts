// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ListenerService } from '../services/listener.service';
import { ArtistService } from '../services/artist.service';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showCreatePlaylist: boolean = false;
  playlistName: string | null = null
  userRole: string | null = localStorage.getItem('userRole');
  userId: string | null = localStorage.getItem('UserId');
  authId: string | null = localStorage.getItem('AuthId') 
  playlists: any[] = [];
  likedPlaylists: any[] = [];
  recommendedSongs: any[] = [];
  albums: any[] = [];
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private listenerService: ListenerService, private artistService: ArtistService, private searchService: SearchService, private authService: AuthService) {}

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
      this.listenerService.getLikedPlaylists().subscribe(data => {
        this.likedPlaylists = data;
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

  createPlaylist(): void {
    if (this.playlistName?.trim()) {
      this.listenerService.createPlaylist(this.playlistName!, this.userId!).subscribe({
        next: () => {
          this.loadListenerData();
          this.search();
        },
        error: (err) => {
          console.error('Playlist Creation went wrong!: ', err);
        }
      });
    }

    this.playlistName = null
  }

  removePlaylist(playlistName: string, UserId: string) : void {
    this.listenerService.removePlaylist(playlistName, UserId).subscribe({
      next: () => {
        this.loadListenerData();
        this.search();
      },
      error: (err) => {
        console.error('Playlist deletion went wrong!: ', err);
      }
    });
  }

  isOwnedPlaylist(Playlist: any): boolean {
    return this.playlists.some(
      playlist => playlist.playlist_name === Playlist.name && playlist.user_id === Playlist.auth
    );
  }

  isPlaylistLiked(playlistName: string, UserId: string): boolean {
    return this.likedPlaylists.some(
      playlist => playlist.playlist_name === playlistName && playlist.user_id === UserId
    );
  }



  toggleLike(playlistName: string, user: string): void {
    
    const isLiked = this.isPlaylistLiked(playlistName, user)

    if(!isLiked) {
      // add to liked playlists in the backend
      this.listenerService.addToLikedPlaylists(playlistName, user).subscribe({
        next: () => {
          this.loadListenerData();

        }, 
        error: (err) => {
          console.log("playlist Not added to likedPlaylist")
        }
      })
    } else {
      // remove from liked playlists in the backend 
      this.listenerService.removeFromLikedPlaylists(playlistName, user).subscribe({
        next: () => {
          this.loadListenerData();
        },
        error: (err) => {
          console.log("playlist did not get removed from liked playlists")
        }
      })
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
