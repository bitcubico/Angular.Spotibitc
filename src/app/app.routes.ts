import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { ArtistComponent } from './componets/artist/artist.component';
import { SearchComponent } from './componets/search/search.component';
import { PageNotFoundComponent } from './componets/error/page-not-found/page-not-found.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'search', component: SearchComponent},
    { path: 'error/404', component: PageNotFoundComponent},
    // Si la url llega sin ningun parametro se redirecciona al home
    { path: '', pathMatch:'full', redirectTo: 'home'},
    { path: '**', component: PageNotFoundComponent}

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
