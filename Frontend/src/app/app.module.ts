import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoleSelectionComponent } from './auth/role-selection/role-selection.component';
import { AuthChoiceComponent } from './auth/auth-choice/auth-choice.component';
import { RouterModule } from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { ArtistService } from './services/artist.service'
import { ListenerService } from './services/listener.service'
import { SearchService } from './services/search.service';
import { AlbumsComponent } from './albums/albums.component';
import { SongsComponent } from './songs/songs.component'



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    RoleSelectionComponent,
    AuthChoiceComponent,
    AlbumsComponent,
    SongsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
