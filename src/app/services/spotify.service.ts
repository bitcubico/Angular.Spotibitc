import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;
  private urlBase: string = 'https://api.spotify.com/v1';

  constructor(private _httpClient: HttpClient) {  }

  getNewReleases(): Observable<Object>
  {
    let actionUrl = `browse/new-releases`;
    return this.getQuery(actionUrl)
            .pipe( 
              map(data => {
                return data['albums'];
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  getArtistDetailById(id: string): Observable<Object>{
    let actionUrl = `artists/${id}`;
    return this.getQuery(actionUrl)
            .pipe( 
              map( data => {
                return data;
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  getTopTracks(id: string): Observable<Object>{
    let actionUrl = `artists/${id}/top-tracks?market=US`;
    return this.getQuery(actionUrl)
            .pipe( 
              map( data => {
                return data['tracks'];
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  getAlbumesByAritstId(id: string, limit: number = 20, next: boolean = false): Observable<Object>{
    let actionUrl = `artists/${id}/albums?limit=${limit}`;

    if(next)
      actionUrl += `&offset=${limit}`;

    return this.getQuery(actionUrl)
            .pipe( 
              map( data => {              
                return data['items'];
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  getAlbumDetailById(id: string): Observable<Object>{
    let actionUrl = `albums/${id}`;
    return this.getQuery(actionUrl)
            .pipe( 
              map( data => {
                return data;
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  searchByArtistName(keyword: string): Observable<Object> {
    let actionUrl = `search?q=${keyword}&type=artist&limit=20`;
    return this.getQuery(actionUrl)
            .pipe( 
              map( data => {
                return data['artists'];
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  private getToken(): Observable<Object>
  {
    let actionUrl = 'https://accounts.spotify.com/api/token';
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '9c9b92bb870741f9ac0e9ab2a1193a94')
      .set('client_secret', '9322f27c757940e68dc0099ab33cea8a');

    return this._httpClient.post(actionUrl, body)
            .pipe( 
              map(data => {
                return data['access_token'];
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  private getQuery(query: string): Observable<Object> {    
    this.getToken().subscribe(
      (response: any) => {
        this.token = response;
        console.log('Token: ' + this.token);
      });

    let actionUrl = `${this.urlBase}/${query}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
    //console.log(headers);

    return this._httpClient.get(actionUrl, {headers});
  }

  private sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
