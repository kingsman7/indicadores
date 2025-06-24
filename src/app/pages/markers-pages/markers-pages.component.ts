import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxglMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-pages',
  imports: [JsonPipe],
  templateUrl: './markers-pages.component.html',
  styles: `
  
  `
})
export class MarkersPagesComponent implements AfterViewInit {
  divElement= viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | undefined>(undefined);
  coordinates = signal({lng: -64.7, lat: 9.8});
  markers = signal<Marker[]>([]);

  

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement) return;
    const element = this.divElement()?.nativeElement;
    const {lng, lat} = this.coordinates();
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    this.mapListeners(map);
    
  }
  
  mapListeners(map: mapboxgl.Map){

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
    map.addControl(new mapboxgl.AttributionControl());
    
    map.on('click', (event) => this.mapClick(event, map))


    this.map.set(map)
  }

  mapClick(event: mapboxgl.MapMouseEvent, map: mapboxgl.Map){
    const color = '#xxxxxx'.replace(/x/g, () => (Math.floor(Math.random() * 16) | 0).toString(16));
    const marker = new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(event.lngLat)
      .addTo(map);
    const newMarker: Marker = {
      id: uuidv4(),
      mapboxglMarker: marker,
    }
    this.markers.set([...this.markers(), newMarker]);
    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map()) return;
    this.map()?.flyTo({
      center: lngLat,
      zoom: 12,
    })
  }

}
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }); 
}

