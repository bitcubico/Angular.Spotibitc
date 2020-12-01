import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];

  constructor(private _spotifyService: SpotifyService) 
  {
    this._spotifyService.getNewReleases()
      .subscribe((data:any) => {
        console.log(data);
        this.newReleases = data.items;
        console.log(this.newReleases);
      });
  }

  ngOnInit(): void {
  }

}
