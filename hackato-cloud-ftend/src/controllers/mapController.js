import axios from 'axios';
import * as turf from '@turf/turf';
import apiService from '../service/apiService';
import { geoJsonTarragones } from "../geojson/geoJsonTarragones.js";

const mapController = {
    getGeojsonWithRentData: async () => {
        try {
            const preus = await apiService.getPreusLloguer();


            const features = [];

           const municipi = "Tarragona";

                const url = `https://nominatim.openstreetmap.org/search?format=geojson&polygon_geojson=1&country=ES&county=Tarragonès&city=${encodeURIComponent(municipi)}`;
                const response = await axios.get(url, { timeout: 10000 });
                console.log(response.data);
                const data = response.data;
                const polygon = data.features[0]?.geometry;

                console.log(polygon);
                const polygonBase = turf.polygon(geoJsonTarragones.features[0].geometry.coordinates);
                const polygonToCheck = turf.polygon(polygon.coordinates);

                if (turf.booleanWithin(polygonToCheck, polygonBase)) {
                    features.push({
                        type: 'Feature',
                        geometry: polygon,
                        properties: {
                            nomTerritori: municipi,
                            tramPreus: preus[municipi].tramPreus,
                            renda: preus[municipi].renda,
                        }
                    });
                }



            return {
                type: 'FeatureCollection',
                features
            };
        } catch (error) {
            console.error('Error al obtener el GeoJSON con datos de alquiler:', error);
            return null;
        }
    },

    getParkingsAndBusStops: async () => {
        try {
            const parkings = await apiService.getPlacesParking();
            const busStops = await apiService.getParades();

            const features = [];

            parkings.forEach(parking => {
                features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [parking.long, parking.latitu]
                    },
                    properties: {
                        type: 'Parking',
                        name: parking.tipus,
                        capacity: parking.places
                    }
                });
            });

            busStops.forEach(busStop => {
                features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [busStop.longitud, busStop.latitud]
                    },
                    properties: {
                        type: 'Bus Stop',
                        name: busStop.nom,
                        address: busStop.adreca,
                        code: busStop.codi
                    }
                });
            });

            return {
                type: 'FeatureCollection',
                features
            };
        } catch (error) {
            console.error('Error al obtener datos de parkings y paradas de autobús:', error);
            return null;
        }
    }
};

export default mapController;
