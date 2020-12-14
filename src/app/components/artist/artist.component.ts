import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

interface album {
  id: string,
  title: string,
  type: string,
  artists: any[],
  image: string,
  release_date: string,
  total_tracks: number,
}

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  loading: boolean;
  loading_album: boolean;
  artist_id: string;
  image: any[];
  name: string;
  followers: number;
  popularity: number;
  external_url: string;
  top_tracks: any[];
  genres: any[] = [];
  albumes: album[] = [];
  total_albumes: number;
  error: boolean;
  error_message: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _spotifyService: SpotifyService,
              private _location: Location) { }

  ngOnInit(): void {
    this.loading = true;
    this._activatedRoute.params.subscribe(params => {
      this.artist_id = params['id'];
      
      this._spotifyService.getArtistDetailById(this.artist_id).subscribe((data:any) => {
        let images: any[] = data['images'];
        this.image = images;
        this.name = data['name'];
        this.followers = data['followers']['total'];
        this.genres = data['genres'];
        this.popularity = data['popularity'];
        this.external_url = data['external_urls']['spotify'];
        
        this._spotifyService.getTopTracks(this.artist_id).subscribe((data:any) => {
          this.top_tracks = data;
          console.log(this.top_tracks);
          this.loading = false;
        }, (service_error) => {
          this.error = true;    
          this.error_message = service_error.error.message;
          this.loading = false;
        });
        
        console.log(data);
      }, (service_error) => {
        this.error = true;    
        this.error_message = service_error.error.message;
        this.loading = false;
      });
    });
  }

  getAlbumes(){
    this.loading_album = true;
    this._spotifyService.getAlbumesByAritstId(this.artist_id, 50)
    .subscribe( (data:any) => {
      data.forEach(element => {
        let album: album = {
          id: element['id'],
          title: element['name'],
          type: element['type'],
          artists: element['artists'],
          image: element['images'],
          release_date: element['release_date'],
          total_tracks: element['total_tracks']
        };
        
        this.albumes.push(album);
      });

      this.total_albumes = data['total'];
      console.log(this.total_albumes);
      console.log(data);
      this.loading_album = false;
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
