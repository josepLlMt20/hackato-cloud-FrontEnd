import apiService from "../service/apiService";
import tarragonesGeojson from "../geojson/tarragones.geojson";

const mapController = {
    getGeojsonWithRentData: async () => {
        try {
            // 1. Obtener datos de alquiler desde la API
            const rentData = await apiService.getPreusLloguer();

            // 2. Clonar el GeoJSON para no modificar el original
            const enrichedGeojson = { ...tarragonesGeojson };

            // 3. Mapear los datos de alquiler a sus respectivos polígonos
            enrichedGeojson.features = enrichedGeojson.features.map(feature => {
                const nomTerritori = feature.properties.NOM_MUNI; // Ajusta según la estructura del GeoJSON
                const rentInfo = rentData.find(r => r.nomTerritori === nomTerritori);

                if (rentInfo) {
                    feature.properties.renda = rentInfo.renda;
                    feature.properties.habitatges = rentInfo.habitatges;
                    feature.properties.tramPreus = rentInfo.tramPreus;
                }

                return feature;
            });

            return enrichedGeojson;
        } catch (error) {
            console.error("Error cargando datos de alquiler:", error);
            return null;
        }
    }
};

export default mapController;
