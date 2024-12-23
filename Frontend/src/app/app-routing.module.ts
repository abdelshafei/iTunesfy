import { RouterModule, Routes } from "@angular/router";
import { AuthChoiceComponent } from "./auth/auth-choice/auth-choice.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RoleSelectionComponent } from "./auth/role-selection/role-selection.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';

import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', redirectTo: '/role-selection', pathMatch: 'full' },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'auth-choice', component: AuthChoiceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },// User's dashboard after login
  { path: 'album/:albumId/:albumName', component: AlbumDetailComponent },
  { path: 'artist/:artistId/:artistName', component: ArtistDetailComponent},
  { path: 'playlist/:playlistName/:userId', component: PlaylistDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
