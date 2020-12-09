import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string = "BQB0ZvvvLr8DOb8TvvGlTIKQY8tqb3eGhhHJNAgentiG7sFbvzgv32yFf_qzIcVFLQV2kSlWhSUhdF1wpI8";
  private urlBase: string = 'https://api.spotify.com/v1';

  constructor(private _httpClient: HttpClient) {  }

  private getToken(): Observable<Object>
  {
    let actionUrl = 'https://accounts.spotify.com/api/token';
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '9c9b92bb870741f9ac0e9ab2a1193a94')
      .set('client_secret', '9322f27c757940e68dc0099ab33cea8a');

    return this._httpClient.post(actionUrl, body)
            .pipe( map(data => {
              return data['access_token'];
            }));
  }

  private getQuery(query: string): Observable<Object> {
    // Si aún no se ha solicitado token, lo solicito
    if(this.token === undefined) {
      this.getToken().subscribe(
      {
        next(response) {
          this.token = response;
          console.log('Token: ' + this.token);

          //headers.set('Authorization', 'Bearer ' + this.token);
          //return this._httpClient.get(actionUrl, {headers});
        }
      });
    }

    let actionUrl = `${this.urlBase}/${query}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
    //console.log(headers);

    return this._httpClient.get(actionUrl, {headers});
  }

  getNewReleases(): Observable<Object>
  {
    let actionUrl = `browse/new-releases`;
    return this.getQuery(actionUrl)
            .pipe( map(data => {
              return data['albums'];
            }));
  }

  getByArtistName(keyword: string){
    let actionUrl = `search?q=${keyword}&type=artist&limit=20`;
    return this.getQuery(actionUrl)
            .pipe( map( data => {
              return data['artists'];
            }));
  }
}
