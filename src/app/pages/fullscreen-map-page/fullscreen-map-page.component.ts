import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Suceso, sucesosDB } from '../../data/database';

interface MarkerAndSuceso {
  suceso: Suceso;
  marker: mapboxgl.Marker;
  color: string;
}

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [CommonModule],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  #map-style-switcher {
    position: fixed;
    top: 13rem;
    right: 5px;
    z-index: 100;
  }

  .mapbox-style-button {
    background-color: #fff !important;
    color: #000 !important;
    border: none !important;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1) !important;
    text-transform: none !important;
  }

  .mapbox-style-button:hover {
    background-color: #f2f2f2 !important;
  }

  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement= viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | undefined>(undefined);
  coordinates = signal({lng: -64.7, lat: 9.8});
  sucesosWithMarkers = signal<MarkerAndSuceso[]>([]);

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement) return;
    const element = this.divElement()?.nativeElement;
    const {lng, lat} = this.coordinates();
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 9,
    });
    
    this.map.set(map);
    this.mapListeners(map);
  }
  
  mapListeners(map: mapboxgl.Map){

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });
    
    map.on('load', () => {
      console.log('map loaded, adding controls and markers');
      
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.ScaleControl());
      map.addControl(new mapboxgl.AttributionControl());

      this.createMarkers(map);
    });
  }

  createMarkers(map: mapboxgl.Map) {
    const colorMapping: { [key: string]: string } = {
      'Robo a transeúnte con violencia': '#FF5733',
      'Alteración del orden público': '#33C4FF',
      'Robo de vehículo': '#FF33A1',
      'Violencia familiar': '#A133FF',
      'Default': '#808080'
    };

    const newMarkers: MarkerAndSuceso[] = [];

    sucesosDB.forEach((suceso: Suceso) => {
      const { lng, lat } = suceso.coordenadas;
      const color = colorMapping[suceso.tipo] || colorMapping['Default'];

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="color: black; font-family: Arial, sans-serif;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${suceso.tipo}</h3>
            <p style="margin-bottom: 3px;"><strong>ID:</strong> ${suceso.id}</p>
            <p style="margin-bottom: 3px;"><strong>Desc:</strong> ${suceso.descripcion}</p>
            <p><strong>Dir:</strong> ${suceso.direccion}</p>
          </div>
        `);

      const marker = new mapboxgl.Marker({ color })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
      
      newMarkers.push({ suceso, marker, color });
    });
    this.sucesosWithMarkers.set(newMarkers);
  }

  flyToMarker(lngLat: mapboxgl.LngLat) {
    if (!this.map()) return;
    this.map()?.flyTo({
      center: lngLat,
      zoom: 15
    });
  }

  changeStyle(style: string) {
    if (!this.map()) return;
    this.map()?.setStyle('mapbox://styles/mapbox/' + style);
  }
}
