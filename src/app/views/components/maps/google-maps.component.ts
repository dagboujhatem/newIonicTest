import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

/// <reference types="googlemaps" />

// Marker interface for type safety
interface Marker {
  position: google.maps.LatLngLiteral;
  label?: string;
  title: string;
  www: string;
}

@Component({
  selector: 'app-google-maps-integration',
  templateUrl: 'google-maps.component.html',
  styleUrls: ['google-maps.component.scss'],
  providers: [GoogleMapsLoaderService],
})
export class GoogleMapsComponent implements OnInit, OnDestroy {
  apiLoaded: Observable<boolean>;

  title: string = '';

  options: google.maps.MapOptions = {
    center: {
      lat: 37.42000,
      lng: -122.103719
    },
    zoom: 11
  };

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  markers: Marker[] = [
    {
      position: {
        lat: 37.431489,
        lng: -122.163719,
      },
      label: 'S',
      title: 'Stanford',
      www: 'https://www.stanford.edu/',
    },
    {
      position: {
        lat: 37.394694,
        lng: -122.150333,
      },
      label: 'T',
      title: 'Tesla',
      www: 'https://www.tesla.com/',
    },
    {
      position: {
        lat: 37.331681,
        lng: -122.0301,
      },
      label: 'A',
      title: 'Apple',
      www: 'https://www.apple.com/',
    },
    {
      position: {
        lat: 37.484722,
        lng: -122.148333,
      },
      label: 'F',
      title: 'Facebook',
      www: 'https://www.facebook.com/',
    },
  ];

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  private activeInfoWindow: Marker;

  get infoWindowContent() {
    return this.activeInfoWindow;
  }

  set infoWindowContent(marker) {
    this.title = marker.title;
    this.activeInfoWindow = marker;
  }

  constructor(
    public gmLoader: GoogleMapsLoaderService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    this.setPositions();
  }

  ngOnDestroy() {
    this.removeGoogleMapScript();
  }

  setPositions() {
    this.markers.forEach((marker) => {
      const {lat, lng} = {...marker.position};
      this.markerPositions.push({lat, lng});
    });
  }


  openInfoWindow(marker: MapMarker, item: Marker) {
    this.infoWindowContent = item;
    this.infoWindow.open(marker);
  }

  removeGoogleMapScript() {
    // todo: temp workaround for 'You have included the Google Maps API multiple times on this page'
    const keywords = ['maps.googleapis'];

    // Remove google from BOM (window object)
    window.google = undefined;

    // Remove google map scripts from DOM
    const scripts = this.document.head.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const scriptSource = scripts[i].getAttribute('src');
      if (scriptSource != null) {
        if (keywords.filter(item => scriptSource.includes(item)).length) {
          scripts[i].remove();
          // scripts[i].parentNode.removeChild(scripts[i]);
        }
      }
    }
  }

}
