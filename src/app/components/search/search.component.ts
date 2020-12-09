import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  resultSearch: any[] = [];
  loading: boolean;

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  searchByArtistName(keyword: string){
    this.loading = true;
    this._spotifyService.getByArtistName(keyword)
      .subscribe((data:any) => {
        console.log(data);
        this.resultSearch = data.items;
        console.log(this.resultSearch);
        this.loading = false;
      });
  }
}
