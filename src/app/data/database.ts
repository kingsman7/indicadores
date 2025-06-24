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
  estado?: string;
}

export const sucesosDB: Suceso[] = [
  // Distrito Capital
  { id: 'FOL-DC-001', fecha: '2024-01-10', hora: '14:30', tipo: 'Robo', descripcion: 'Asalto a mano armada en tienda.', direccion: 'Av. Urdaneta, La Candelaria, Caracas', coordenadas: { lng: -66.9036, lat: 10.5061 }, estatus: 'Cerrado', estado: 'Distrito Capital'},
  { id: 'FOL-DC-002', fecha: '2024-01-15', hora: '22:00', tipo: 'Homicidio', descripcion: 'Cuerpo encontrado con herida de bala.', direccion: 'Plaza Venezuela, Los Caobos, Caracas', coordenadas: { lng: -66.8918, lat: 10.4984 }, estatus: 'Activo', estado: 'Distrito Capital' },
  // Zulia
  { id: 'FOL-ZU-001', fecha: '2024-01-20', hora: '18:45', tipo: 'Robo de vehículo', descripcion: 'Despojan a ciudadano de su camioneta.', direccion: 'Av. 5 de Julio, Maracaibo', coordenadas: { lng: -71.6125, lat: 10.6666 }, estatus: 'En Proceso', estado: 'Zulia' },
  { id: 'FOL-ZU-002', fecha: '2024-02-01', hora: '11:00', tipo: 'Hurto', descripcion: 'Sustracción de mercancía en supermercado.', direccion: 'C.C. Sambil Maracaibo, Av. Guajira, Maracaibo', coordenadas: { lng: -71.6033, lat: 10.7107 }, estatus: 'Cerrado', estado: 'Zulia' },
  // Miranda
  { id: 'FOL-MI-001', fecha: '2024-02-05', hora: '09:20', tipo: 'Lesiones personales', descripcion: 'Riña callejera con heridos leves.', direccion: 'Calle Miquilén, Los Teques', coordenadas: { lng: -67.0437, lat: 10.3459 }, estatus: 'Cerrado', estado: 'Miranda' },
  { id: 'FOL-MI-002', fecha: '2024-02-10', hora: '20:10', tipo: 'Secuestro', descripcion: 'Secuestro express de empresario.', direccion: 'Urb. El Cafetal, Caracas', coordenadas: { lng: -66.8295, lat: 10.4667 }, estatus: 'Activo', estado: 'Miranda' },
  // Carabobo
  { id: 'FOL-CA-001', fecha: '2024-02-12', hora: '15:00', tipo: 'Hurto de vehículo', descripcion: 'Vehículo sustraído de estacionamiento.', direccion: 'Av. Bolívar Norte, Valencia', coordenadas: { lng: -68.0076, lat: 10.2251 }, estatus: 'En Proceso', estado: 'Carabobo' },
  { id: 'FOL-CA-002', fecha: '2024-02-18', hora: '12:30', tipo: 'Intervención legal', descripcion: 'Enfrentamiento entre policía y banda.', direccion: 'Barrio La Democracia, Valencia', coordenadas: { lng: -67.9811, lat: 10.1987 }, estatus: 'Cerrado', estado: 'Carabobo' },
  // Aragua
  { id: 'FOL-AR-001', fecha: '2024-02-20', hora: '23:50', tipo: 'Homicidio', descripcion: 'Ajuste de cuentas con un fallecido.', direccion: 'Av. Las Delicias, Maracay', coordenadas: { lng: -67.6259, lat: 10.2781 }, estatus: 'Activo', estado: 'Aragua' },
  { id: 'FOL-AR-002', fecha: '2024-02-25', hora: '17:00', tipo: 'Violación', descripcion: 'Denuncia por agresión sexual en parque.', direccion: 'Parque Nacional Henri Pittier, Maracay', coordenadas: { lng: -67.6833, lat: 10.4 }, estatus: 'En Proceso', estado: 'Aragua' },
  // Lara
  { id: 'FOL-LA-001', fecha: '2024-03-01', hora: '13:15', tipo: 'Robo', descripcion: 'Robo a residencia.', direccion: 'Urb. Nueva Segovia, Barquisimeto', coordenadas: { lng: -69.2936, lat: 10.0645 }, estatus: 'Cerrado', estado: 'Lara' },
  { id: 'FOL-LA-002', fecha: '2024-03-03', hora: '19:00', tipo: 'Lesiones personales', descripcion: 'Disputa vecinal con agresión física.', direccion: 'Av. Venezuela con Av. Vargas, Barquisimeto', coordenadas: { lng: -69.3175, lat: 10.0711 }, estatus: 'Cerrado', estado: 'Lara' },
  // Bolívar
  { id: 'FOL-BO-001', fecha: '2024-03-05', hora: '10:00', tipo: 'Hurto', descripcion: 'Extracción ilegal de material de construcción.', direccion: 'Paseo Orinoco, Ciudad Bolívar', coordenadas: { lng: -63.5491, lat: 8.1222 }, estatus: 'En Proceso', estado: 'Bolívar' },
  { id: 'FOL-BO-002', fecha: '2024-03-10', hora: '16:20', tipo: 'Robo de vehículo', descripcion: 'Motocicleta robada a repartidor.', direccion: 'Alta Vista, Puerto Ordaz', coordenadas: { lng: -62.723, lat: 8.2976 }, estatus: 'Activo', estado: 'Bolívar' },
  // Táchira
  { id: 'FOL-TA-001', fecha: '2024-03-12', hora: '21:30', tipo: 'Intervención legal', descripcion: 'Operativo anti-contrabando.', direccion: 'Puente Internacional Simón Bolívar, San Antonio', coordenadas: { lng: -72.445, lat: 7.818 }, estatus: 'Cerrado', estado: 'Táchira' },
  { id: 'FOL-TA-002', fecha: '2024-03-18', hora: '08:00', tipo: 'Secuestro', descripcion: 'Ganadero secuestrado en su finca.', direccion: 'La Grita, Táchira', coordenadas: { lng: -71.9833, lat: 8.3667 }, estatus: 'Activo', estado: 'Táchira' },
  // Anzoátegui
  { id: 'FOL-AN-001', fecha: '2024-03-20', hora: '14:00', tipo: 'Robo', descripcion: 'Asalto a transporte público.', direccion: 'Autopista Gran Mariscal de Ayacucho, Píritu', coordenadas: { lng: -65.0333, lat: 10.0667 }, estatus: 'En Proceso', estado: 'Anzoátegui' },
  { id: 'FOL-AN-002', fecha: '2024-03-25', hora: '11:45', tipo: 'Hurto de vehículo', descripcion: 'Automóvil sustraído de centro comercial.', direccion: 'C.C. Plaza Mayor, Lechería', coordenadas: { lng: -64.6333, lat: 10.2167 }, estatus: 'Activo', estado: 'Anzoátegui' },
  // Mérida
  { id: 'FOL-ME-001', fecha: '2024-04-01', hora: '16:50', tipo: 'Lesiones personales', descripcion: 'Accidente de tránsito con heridos.', direccion: 'Av. Las Américas, Mérida', coordenadas: { lng: -71.1449, lat: 8.5878 }, estatus: 'Cerrado', estado: 'Mérida' },
  { id: 'FOL-ME-002', fecha: '2024-04-05', hora: '19:30', tipo: 'Hurto', descripcion: 'Robo de equipo de montañismo en hostal.', direccion: 'Plaza Bolívar de Mérida, Mérida', coordenadas: { lng: -71.1442, lat: 8.596 }, estatus: 'Cerrado', estado: 'Mérida' },
  // Sucre
  { id: 'FOL-SU-001', fecha: '2024-04-10', hora: '12:00', tipo: 'Robo', descripcion: 'Piratas asaltan a pescadores.', direccion: 'Costas de Cumaná, Sucre', coordenadas: { lng: -64.1757, lat: 10.4632 }, estatus: 'Activo', estado: 'Sucre' },
  { id: 'FOL-SU-002', fecha: '2024-04-11', hora: '15:00', tipo: 'Homicidio', descripcion: 'Encuentran cuerpo en playa.', direccion: 'Playa San Luis, Cumaná', coordenadas: { lng: -64.2001, lat: 10.4612 }, estatus: 'Activo', estado: 'Sucre' },
  // Monagas
  { id: 'FOL-MO-001', fecha: '2024-04-12', hora: '22:15', tipo: 'Homicidio', descripcion: 'Hallazgo de un cuerpo en las afueras.', direccion: 'Carretera Nacional, Maturín', coordenadas: { lng: -63.1833, lat: 9.75 }, estatus: 'Activo', estado: 'Monagas' },
  { id: 'FOL-MO-002', fecha: '2024-04-13', hora: '18:00', tipo: 'Robo de vehículo', descripcion: 'Robo de camión de carga.', direccion: 'Av. Alirio Ugarte Pelayo, Maturín', coordenadas: { lng: -63.1667, lat: 9.7667 }, estatus: 'En Proceso', estado: 'Monagas' },
  // Falcón
  { id: 'FOL-FA-001', fecha: '2024-04-15', hora: '17:30', tipo: 'Robo de vehículo', descripcion: 'Turistas son despojados de su vehículo.', direccion: 'Carretera Morón-Coro, Falcón', coordenadas: { lng: -68.7, lat: 11.05 }, estatus: 'En Proceso', estado: 'Falcón' },
  { id: 'FOL-FA-002', fecha: '2024-04-16', hora: '10:00', tipo: 'Hurto', descripcion: 'Hurto en posada turística.', direccion: 'Parque Nacional Morrocoy, Tucacas', coordenadas: { lng: -68.25, lat: 10.8 }, estatus: 'Cerrado', estado: 'Falcón' },
  // Portuguesa
  { id: 'FOL-PO-001', fecha: '2024-04-18', hora: '11:00', tipo: 'Intervención legal', descripcion: 'Desmantelamiento de banda de extorsión.', direccion: 'Acarigua, Portuguesa', coordenadas: { lng: -69.2017, lat: 9.5597 }, estatus: 'Cerrado', estado: 'Portuguesa' },
  { id: 'FOL-PO-002', fecha: '2024-04-19', hora: '20:30', tipo: 'Lesiones personales', descripcion: 'Herido en riña durante fiestas patronales.', direccion: 'Guanare, Portuguesa', coordenadas: { lng: -69.7469, lat: 9.0436 }, estatus: 'Cerrado', estado: 'Portuguesa' },
  // Guárico
  { id: 'FOL-GU-001', fecha: '2024-04-20', hora: '14:20', tipo: 'Secuestro', descripcion: 'Productor agropecuario secuestrado.', direccion: 'Valle de la Pascua, Guárico', coordenadas: { lng: -66.0075, lat: 9.2183 }, estatus: 'Activo', estado: 'Guárico' },
  { id: 'FOL-GU-002', fecha: '2024-04-21', hora: '16:00', tipo: 'Robo', descripcion: 'Asalto en finca.', direccion: 'San Juan de los Morros, Guárico', coordenadas: { lng: -67.3536, lat: 9.9042 }, estatus: 'Activo', estado: 'Guárico' },
  // Barinas
  { id: 'FOL-BA-001', fecha: '2024-04-22', hora: '20:00', tipo: 'Lesiones personales', descripcion: 'Riña en un bar deja varios heridos.', direccion: 'Av. 23 de Enero, Barinas', coordenadas: { lng: -70.2069, lat: 8.6226 }, estatus: 'Cerrado', estado: 'Barinas' },
  { id: 'FOL-BA-002', fecha: '2024-04-23', hora: '09:00', tipo: 'Hurto de vehículo', descripcion: 'Robo de motocicleta en la universidad.', direccion: 'UNELLEZ, Barinas', coordenadas: { lng: -70.2167, lat: 8.6167 }, estatus: 'Activo', estado: 'Barinas' },
  // Trujillo
  { id: 'FOL-TR-001', fecha: '2024-04-25', hora: '09:45', tipo: 'Hurto', descripcion: 'Sustracción de objetos de valor de iglesia.', direccion: 'Catedral de Trujillo, Trujillo', coordenadas: { lng: -70.4339, lat: 9.3667 }, estatus: 'Cerrado', estado: 'Trujillo' },
  { id: 'FOL-TR-002', fecha: '2024-04-26', hora: '13:00', tipo: 'Robo de vehículo', descripcion: 'Robo de camión con café.', direccion: 'Boconó, Trujillo', coordenadas: { lng: -70.25, lat: 9.25 }, estatus: 'En Proceso', estado: 'Trujillo' },
  // Yaracuy
  { id: 'FOL-YA-001', fecha: '2024-05-01', hora: '18:00', tipo: 'Robo', descripcion: 'Asalto a unidad de transporte.', direccion: 'Autopista Cimarrón Andresote, Yaracuy', coordenadas: { lng: -68.7, lat: 10.3 }, estatus: 'En Proceso', estado: 'Yaracuy' },
  { id: 'FOL-YA-002', fecha: '2024-05-02', hora: '21:00', tipo: 'Violación', descripcion: 'Denuncia de agresión sexual.', direccion: 'Parque de la Exótica Flora Tropical, San Felipe', coordenadas: { lng: -68.7458, lat: 10.3394 }, estatus: 'Activo', estado: 'Yaracuy' },
  // Nueva Esparta
  { id: 'FOL-NE-001', fecha: '2024-05-05', hora: '23:00', tipo: 'Violación', descripcion: 'Denuncia de agresión sexual en playa.', direccion: 'Playa El Agua, Isla de Margarita', coordenadas: { lng: -63.85, lat: 11.15 }, estatus: 'En Proceso', estado: 'Nueva Esparta' },
  { id: 'FOL-NE-002', fecha: '2024-05-06', hora: '16:00', tipo: 'Hurto', descripcion: 'Hurto a turista en el mercado.', direccion: 'Mercado de Conejeros, Porlamar', coordenadas: { lng: -63.85, lat: 10.9667 }, estatus: 'Cerrado', estado: 'Nueva Esparta' },
  // Cojedes
  { id: 'FOL-CO-001', fecha: '2024-05-10', hora: '10:30', tipo: 'Intervención legal', descripcion: 'Enfrentamiento con abatido.', direccion: 'San Carlos, Cojedes', coordenadas: { lng: -68.592, lat: 9.6612 }, estatus: 'Cerrado', estado: 'Cojedes' },
  { id: 'FOL-CO-002', fecha: '2024-05-11', hora: '14:00', tipo: 'Robo', descripcion: 'Robo en finca ganadera.', direccion: 'Tinaquillo, Cojedes', coordenadas: { lng: -68.25, lat: 9.9167 }, estatus: 'Activo', estado: 'Cojedes' },
  // Apure
  { id: 'FOL-AP-001', fecha: '2024-05-15', hora: '13:00', tipo: 'Secuestro', descripcion: 'Secuestro de comerciante.', direccion: 'San Fernando de Apure, Apure', coordenadas: { lng: -67.4725, lat: 7.8988 }, estatus: 'Activo', estado: 'Apure' },
  { id: 'FOL-AP-002', fecha: '2024-05-16', hora: '19:00', tipo: 'Homicidio', descripcion: 'Homicidio por sicariato.', direccion: 'Elorza, Apure', coordenadas: { lng: -69.4969, lat: 7.0603 }, estatus: 'Activo', estado: 'Apure' },
  // La Guaira
  { id: 'FOL-LG-001', fecha: '2024-05-20', hora: '17:00', tipo: 'Robo', descripcion: 'Robo a bañistas en la playa.', direccion: 'Playa Los Caracas, La Guaira', coordenadas: { lng: -66.4333, lat: 10.6167 }, estatus: 'En Proceso', estado: 'La Guaira' },
  { id: 'FOL-LG-002', fecha: '2024-05-21', hora: '11:00', tipo: 'Hurto', descripcion: 'Hurto de equipaje en el aeropuerto.', direccion: 'Aeropuerto Internacional de Maiquetía, La Guaira', coordenadas: { lng: -66.9908, lat: 10.6031 }, estatus: 'Cerrado', estado: 'La Guaira' },
  // Delta Amacuro
  { id: 'FOL-DA-001', fecha: '2024-05-25', hora: '08:00', tipo: 'Intervención legal', descripcion: 'Operativo contra minería ilegal.', direccion: 'Tucupita, Delta Amacuro', coordenadas: { lng: -62.0683, lat: 9.0583 }, estatus: 'Cerrado', estado: 'Delta Amacuro' },
  { id: 'FOL-DA-002', fecha: '2024-05-26', hora: '12:00', tipo: 'Lesiones personales', descripcion: 'Lesionado por animal salvaje.', direccion: 'Parque Nacional Delta del Orinoco', coordenadas: { lng: -61.5, lat: 9.0 }, estatus: 'Cerrado', estado: 'Delta Amacuro' },
  // Amazonas
  { id: 'FOL-AM-001', fecha: '2024-06-01', hora: '10:00', tipo: 'Hurto', descripcion: 'Hurto en comunidad indígena.', direccion: 'Puerto Ayacucho, Amazonas', coordenadas: { lng: -67.6236, lat: 5.6639 }, estatus: 'En Proceso', estado: 'Amazonas' },
  { id: 'FOL-AM-002', fecha: '2024-06-02', hora: '15:30', tipo: 'Homicidio', descripcion: 'Disputa territorial entre bandas.', direccion: 'San Fernando de Atabapo, Amazonas', coordenadas: { lng: -67.7, lat: 4.05 }, estatus: 'Activo', estado: 'Amazonas' },
];
