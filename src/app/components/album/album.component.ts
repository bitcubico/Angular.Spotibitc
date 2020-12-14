import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  artists: any[] = [];
  image: string;
  title: string;
  label: string;
  release_date: string;
  tracks: any[] = [];
  loading: boolean;
  error: boolean;
  error_message: string;

  constructor(private _activedRoute: ActivatedRoute,
              private _spotifyService: SpotifyService,
              private _location: Location) { }

  ngOnInit(): void {
    this.loading = true;
    this._activedRoute.params.subscribe(params => {
      let album_id: string = params['id'];
      this._spotifyService.getAlbumDetailById(album_id).subscribe((data:any) => {
        this.tracks = data['tracks']['items'];

        if(data['album_type'] == 'single') {
          let items: any[] = this.tracks[0];
          this.artists = items['artists'];
          this.title = items['name'];
        } else {
          this.artists = data['artists'];
          this.title = data['name'];
        }
        
        this.label = data['label'];
        this.release_date = data['release_date'];
        this.image = data['images'][0].url;
        this.loading = false;
      }, (service_error) => {
        this.error = true;    
        this.error_message = service_error.error.message;
        this.loading = false;
      })
    }, (service_error) => {
      this.error = true;    
      this.error_message = service_error.error.message;
      this.loading = false;
    });
  }

  back() {
    this._location.back();
  }

}
