import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private _httpClient: HttpClient) {  }

  protected getToken(): Observable<Object>
  {
    let actionUrl = 'https://accounts.spotify.com/api/token';
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '9c9b92bb870741f9ac0e9ab2a1193a94')
      .set('client_secret', 'b614968ca9a6447ba9f465f7dc61dbdd');

    return this._httpClient.post(actionUrl, body);
  }

  getNewReleases(): Observable<Object>
  {
    let actionUrl = 'https://api.spotify.com/v1/browse/new-releases';
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer BQBNuioL7ORioHavBFrq7sIXCEwLsd0zO1idntpt6nsBGwHJNBEuLQNkWp2qN2XTWUAYKTAE_iHea2t8fDc');

    // Si aún no se ha solicitado token, lo solicito
    if(this.token === undefined) {
      this.getToken().subscribe(
      {
        next(data) {
          this.token = data['access_token'];
          console.log('Token: ' + this.token);

          //headers.set('Authorization', 'Bearer ' + this.token);
          //return this._httpClient.get(actionUrl, {headers});
        }
      });
    }

    console.log(headers)
    return this._httpClient.get(actionUrl, {headers});
  }
}
