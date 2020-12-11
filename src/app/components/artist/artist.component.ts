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
  image: string;
  name: string;
  followers: number;
  popularity: number;
  genres: any[] = [];
  albumes: album[] = [];
  total_albumes: number;

  constructor(private _activedRoute: ActivatedRoute,
              private _spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loading = true;
    this._activedRoute.params.subscribe(params => {
      this.artist_id = params['id'];
      this._spotifyService.getArtistDetailById(this.artist_id).subscribe((data:any) => {
        let images: any[] = data['images'];
        this.image = images[0]['url'];
        this.name = data['name'];
        this.followers = data['followers']['total'];
        this.genres = data['genres'];
        this.popularity = data['popularity'];
        console.log(data);
        this.loading = false;
      })
    });
  }

  getAlbumes(){
    this.loading_album = true;
    this._spotifyService.getAlbumesByAritstId(this.artist_id).subscribe( (data:any) => {
      data['items'].forEach(element => {
        let album: album = {
          id: element['id'],
          title: element['name'],
          type: element['type'],
          artists: element['artists'],
          image: element['images'][0]['url'],
          release_date: element['release_date'],
          total_tracks: element['total_tracks']
        };
        
        this.albumes.push(album);
      });

      console.log(this.albumes);
      console.log(data);
      this.loading_album = false;
    });
  }
}
