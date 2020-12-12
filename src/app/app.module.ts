import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es')


// Routes
import { APP_ROUTING } from './app.routes';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';

// Components
import { AppComponent } from './app.component';
import { ArtistComponent } from './components/artist/artist.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CardComponent } from './components/partials/card/card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AlbumComponent } from './components/album/album.component';
import { FollowersReducerPipe } from './pipes/followers-reducer.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    CardComponent,
    NoimagePipe,
    LoadingComponent,
    AlbumComponent,
    FollowersReducerPipe,
    DomseguroPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
