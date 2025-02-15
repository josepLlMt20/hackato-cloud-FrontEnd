const API_BASE_URL = "http://localhost:3000"; // Asegúrate de que esta URL coincide con la de tu backend

const apiService = {
    /* PREU LLOGUER */
    getPreusLloguer: async () => {
        const response = await fetch(`${API_BASE_URL}/preusLloguer`);
        return response.json();
    },
    getPreuLloguerById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/preuLloguer/${id}`);
        return response.json();
    },

    /* ALTA BAIXA */
    getAltesBaixes: async () => {
        const response = await fetch(`${API_BASE_URL}/altesBaixes`);
        return response.json();
    },
    getAltaBaixaById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/altaBaixa/${id}`);
        return response.json();
    },
    getAltesBaixesByYear: async (any) => {
        const response = await fetch(`${API_BASE_URL}/altesBaixesAny/${any}`);
        return response.json();
    },
    getAltesBaixesByMonth: async (mes) => {
        const response = await fetch(`${API_BASE_URL}/altesBaixesMes/${mes}`);
        return response.json();
    },
    getAltesBaixesByType: async (tipo) => {
        const response = await fetch(`${API_BASE_URL}/altesBaixesTipo/${tipo}`);
        return response.json();
    },

    /* PARADES EMT */
    getParades: async () => {
        const response = await fetch(`${API_BASE_URL}/parades`);
        return response.json();
    },
    getParadaById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/parada/${id}`);
        return response.json();
    },

    /* PLACES PARKING */
    getPlacesParking: async () => {
        const response = await fetch(`${API_BASE_URL}/placesParking`);
        return response.json();
    },
    getPlaceParkingById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/placeParking/${id}`);
        return response.json();
    },
    getPlaceParkingByType: async (tipus) => {
        const response = await fetch(`${API_BASE_URL}/placesParkingTipus/${tipus}`);
        return response.json();
    },

    /* POBLACIO */
    getPoblacions: async () => {
        const response = await fetch(`${API_BASE_URL}/poblacions`);
        return response.json();
    },
    getPoblacioById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/poblacio/${id}`);
        return response.json();
    },
    getPoblacioByName: async (poblacio) => {
        const response = await fetch(`${API_BASE_URL}/poblacioNom/${poblacio}`);
        return response.json();
    },

    /* TASSA ATUR */
    getTassesAtur: async () => {
        const response = await fetch(`${API_BASE_URL}/tassesAtur`);
        return response.json();
    },
    getTassaAturById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/tassaAtur/${id}`);
        return response.json();
    },

    /* HABILITACIONS TURÍSTIQUES */
    getHabTuristics: async () => {
        const response = await fetch(`${API_BASE_URL}/habTuristics`);
        return response.json();
    },
    getHabTuristicById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/habTuristic/${id}`);
        return response.json();
    },
    getHabTuristicsByYear: async (any) => {
        const response = await fetch(`${API_BASE_URL}/habTuristicsAny/${any}`);
        return response.json();
    },
    getHabTuristicsByMonth: async (mes) => {
        const response = await fetch(`${API_BASE_URL}/habTuristicsMes/${mes}`);
        return response.json();
    },
    getHabTuristicsByType: async (tipus) => {
        const response = await fetch(`${API_BASE_URL}/habTuristicsTipus/${tipus}`);
        return response.json();
    }
};

export default apiService;
