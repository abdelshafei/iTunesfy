import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
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
import { SearchService } from './services/search.service'



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    RoleSelectionComponent,
    AuthChoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService,
    ArtistService,
    ListenerService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
