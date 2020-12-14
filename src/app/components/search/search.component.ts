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
  error: boolean;
  error_message: string;

  constructor(private _spotifyService: SpotifyService) { this.error = false; }

  ngOnInit(): void {
  }

  searchByArtistName(keyword: string){
    this.loading = true;
    this._spotifyService.searchByArtistName(keyword)
      .subscribe((data:any) => {
        console.log(data);
        this.resultSearch = data.items;
        console.log(this.resultSearch);
        this.loading = false;
      }, (service_error) => {
        this.error = true;    
        this.error_message = service_error.error.message;
        this.loading = false;
      });
  }
}
