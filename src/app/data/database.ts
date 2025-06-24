export interface Coordenadas {
    lat: number;
    lng: number;
}

export interface Detenido {
    nombre: string;
    alias: string;
}

export interface Vehiculo {
    placa: string;
    marca: string;
    modelo: string;
    color: string;
}

export interface Arma {
    tipo: string;
    calibre: string;
    serie?: string;
}

export interface Droga {
    tipo: string;
    cantidad: number;
    unidad: 'g' | 'kg' | 'dosis';
}

export interface Suceso {
  id: string; // Folio
  fecha: string;
  hora: string;
  tipo: string; // e.g., 'Robo a transeúnte', 'Violencia familiar'
  descripcion: string;
  direccion: string;
  coordenadas: Coordenadas;
  estatus: 'Activo' | 'Cerrado' | 'En Proceso';
  detenidos?: Detenido[];
  vehiculosInvolucrados?: Vehiculo[];
  armasAseguradas?: Arma[];
  drogaAsegurada?: Droga[];
  observaciones?: string;
}

export const sucesosDB: Suceso[] = [
    {
        id: 'FOL-2024-001',
        fecha: '2024-06-24',
        hora: '10:15',
        tipo: 'Robo a transeúnte con violencia',
        descripcion: 'Sujeto amaga con arma blanca a transeúnte para despojarlo de su celular y cartera.',
        direccion: 'Av. Insurgentes Sur 123, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX',
        coordenadas: { lat: 9.81, lng: -64.71 },
        estatus: 'Activo',
        detenidos: [
            { nombre: 'Juan Pérez', alias: 'El Rápido' }
        ],
        armasAseguradas: [
            { tipo: 'Arma blanca', calibre: 'N/A' }
        ],
        observaciones: 'La víctima presenta crisis nerviosa, no requiere traslado.'
    },
    {
        id: 'FOL-2024-002',
        fecha: '2024-06-24',
        hora: '11:30',
        tipo: 'Alteración del orden público',
        descripcion: 'Grupo de personas consumiendo bebidas alcohólicas en la vía pública y escuchando música a alto volumen.',
        direccion: 'Parque México, Av México s/n, Hipódromo, Cuauhtémoc, 06100 Ciudad de México, CDMX',
        coordenadas: { lat: 9.805, lng: -64.72 },
        estatus: 'Cerrado',
        detenidos: [],
        observaciones: 'Se realiza llamado de atención y se dispersa al grupo de personas sin incidentes.'
    },
    {
        id: 'FOL-2024-003',
        fecha: '2024-06-23',
        hora: '22:45',
        tipo: 'Robo de vehículo',
        descripcion: 'Reportan robo de vehículo Nissan Versa color gris, placas ABC-123, estacionado fuera del domicilio.',
        direccion: 'Calle de la Amargura 8, Lomas de la Herradura, 52785 Naucalpan de Juárez, Méx.',
        coordenadas: { lat: 9.79, lng: -64.69 },
        estatus: 'En Proceso',
        vehiculosInvolucrados: [
            { placa: 'ABC-123', marca: 'Nissan', modelo: 'Versa', color: 'Gris' }
        ]
    },
    {
        id: 'FOL-2024-004',
        fecha: '2024-06-23',
        hora: '09:00',
        tipo: 'Violencia familiar',
        descripcion: 'Vecinos reportan gritos y golpes en el domicilio contiguo.',
        direccion: 'Cerrada de la Paz 22, Tlalpan Centro, 14000 Ciudad de México, CDMX',
        coordenadas: { lat: 9.82, lng: -64.70 },
        estatus: 'Cerrado',
        observaciones: 'Se entrevista a las partes, la C. Juana López decide no proceder legalmente en esta ocasión. Se le brindó información sobre instancias de apoyo.'
    }
];
