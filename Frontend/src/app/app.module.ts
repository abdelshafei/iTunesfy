import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoleSelectionComponent } from './auth/role-selection/role-selection.component';
import { AuthChoiceComponent } from './auth/auth-choice/auth-choice.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { ArtistService } from './services/artist.service'
import { ListenerService } from './services/listener.service'
import { SearchService } from './services/search.service';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    RoleSelectionComponent,
    AuthChoiceComponent,
    AlbumDetailComponent,
    ArtistDetailComponent,
    PlaylistDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    ArtistService,
    ListenerService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
