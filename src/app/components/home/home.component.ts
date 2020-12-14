import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading: boolean;
  error: boolean;
  error_message: string;
  
  constructor(private _spotifyService: SpotifyService,
              private _router: Router) 
  {
    this.loading = true;
    this._spotifyService.getNewReleases()
      .subscribe((data:any) => {
        console.log(data);
        this.newReleases = data.items;
        console.log(this.newReleases);
        this.loading = false;
      }, (service_error) => {
        this.error = true;    
        this.error_message = service_error.error.message;
        this.loading = false;
      });
  }

  ngOnInit(): void {
  }

  goToArtist(data: any){   
    this._router.navigate(['/album', data['id']])
  }

}
