import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
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
    top: 9rem;
    right: 5px;
    z-index: 50;
  }

  .mapbox-style-button {
    background-color: #fff !important;
    color: #000 !important;
    border: none !important;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1) !important;
    text-transform: none !important;
  }

  #handle-show-filters {
    position: fixed;
    top: 205px;
    right: 5px;
    z-index: 10;
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
  states = signal([
    "Amazonas",
    "Anzoátegui",
    "Apure",
    "Aragua",
    "Barinas",
    "Bolívar",
    "Carabobo",
    "Cojedes",
    "Delta Amacuro",
    "Falcón",
    "Guárico",
    "Lara",
    "Mérida",
    "Miranda",
    "Monagas",
    "Nueva Esparta",
    "Portuguesa",
    "Sucre",
    "Táchira",
    "Trujillo",
    "La Guaira",
    "Yaracuy",
    "Zulia"
]);

crimeTypes = signal([
    "Homicidio",
    "Intervención legal",
    "Lesiones personales",
    "Hurto",
    "Hurto de vehículo",
    "Robo",
    "Robo de vehículo",
    "Secuestro",
    "Violación"
]);

  searchQuery = signal('');
  selectedState = signal('');
  selectCrimeType = signal('');
  dateFilter = signal(''); // Usa string si es solo una fecha
  mostrarFiltros = signal(false);
  mostrarSucesos = signal(true);

  sucesosFiltrados = computed(() => {
    return this.sucesosWithMarkers().filter(item => {
      const suceso = item.suceso;
      const coincideBusqueda = !this.searchQuery() ||
        suceso.id?.toString().includes(this.searchQuery()) ||
        suceso.descripcion?.toLowerCase().includes(this.searchQuery().toLowerCase());
      const coincideEstado = !this.selectedState() || suceso.estado === this.selectedState();
      const coincideFecha = !this.dateFilter() || suceso.fecha === this.dateFilter();
      const coincideTipo = !this.selectCrimeType() || suceso.tipo === this.selectCrimeType();
      return coincideBusqueda && coincideEstado && coincideFecha && coincideTipo;
    });
  });

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
      map.addControl(new mapboxgl.NavigationControl({visualizePitch: true}));
      map.addControl(new mapboxgl.ScaleControl());
      map.addControl(new mapboxgl.AttributionControl());

      this.createMarkers(map);
    });
  }

  createMarkers(map: mapboxgl.Map) {
    const colorMapping: { [key: string]: string } = {
      'Homicidio': '#FF0000',
      'Intervención legal': '#0000FF',
      'Lesiones personales': '#FFA500',
      'Hurto': '#FFFF00',
      'Hurto de vehículo': '#FFD700',
      'Robo': '#DC143C',
      'Robo de vehículo': '#8B0000',
      'Secuestro': '#800080',
      'Violación': '#FF1493',
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

  limpiarFiltros() {
    this.searchQuery.set('');
    this.selectedState.set('');
    this.selectCrimeType.set('');
    this.dateFilter.set('');
  }
}
