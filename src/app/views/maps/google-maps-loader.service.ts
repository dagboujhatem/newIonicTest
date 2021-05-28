import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  apiLoaded: Observable<boolean>;

  constructor(
    httpClient: HttpClient
  ) {
    // To use the Google Maps JavaScript API, you must register your app project on the Google API Console
    // and get a Google API key which you can add to your app
    // see: https://developers.google.com/maps/gmp-get-started
    const apiKey = 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'; // CoreUI demo Google API key, to replace
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
