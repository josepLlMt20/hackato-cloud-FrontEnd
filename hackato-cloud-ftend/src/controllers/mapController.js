import axios from 'axios';
import * as turf from '@turf/turf';
import apiService from '../service/apiService';
import {geoJsonTarragones} from "../geojson/geoJsonTarragones.js";


const mapController = {
    getGeojsonWithRentData: async () => {
        try {
            const preus = await apiService.getPreusLloguer();
            const municipis = Object.keys(preus).slice(0, 25);

            const features = [];

            for (const municipi of municipis) {
                try {
                    const url = `https://nominatim.openstreetmap.org/search?format=geojson&polygon_geojson=1&country=ES&county=Tarragonès&city=${encodeURIComponent(municipi)}`;
                    const response = await axios.get(url, { timeout: 10000 }); // Axios maneja CORS mejor y tiene timeout

                    const data = response.data;
                    const polygon = data.features[0]?.geometry;

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
                } catch (err) {
                    console.error(`Error al obtener datos de ${municipi}:`, err);
                }
            }

            return {
                type: 'FeatureCollection',
                features
            };

        } catch (error) {
            console.error('Error al obtener el GeoJSON con datos de alquiler:', error);
            return null;
        }
    }
};

export default mapController;
