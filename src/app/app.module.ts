import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { ArtistComponent } from './componets/artist/artist.component';
import { HomeComponent } from './componets/home/home.component';
import { SearchComponent } from './componets/search/search.component';
import { NavbarComponent } from './componets/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
