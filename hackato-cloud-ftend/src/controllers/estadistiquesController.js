import apiService from "../service/apiService";

const estadistiquesController = {
    getDadesHabitagesTuristics: async () => {
        try {
            // Obtener datos de los habitages turísticos
            const dadesHabitages = await apiService.getHabTuristics();

            const habitatgesPerAny = {};

            // Recorrer los datos y contar por año
            dadesHabitages.forEach(habitatge => {
                const any = habitatge.any;  // Suponiendo que 'any' es el año

                if (habitatgesPerAny[any]) {
                    habitatgesPerAny[any] += 1;  // Acumular la cantidad de habitages por año
                } else {
                    habitatgesPerAny[any] = 1;  // Iniciar el conteo para un año nuevo
                }
            });

            // Ordenar los años de forma creciente
            const anosOrdenados = Object.keys(habitatgesPerAny).sort((a, b) => a - b);

            // Crear un array con los datos finales para el gráfico
            const dadesHabitagesFiltrades = anosOrdenados.map(any => ({
                label: any,
                value: habitatgesPerAny[any],  // La cantidad de habitages para ese año
            }));

            // Devolver los datos procesados
            return dadesHabitagesFiltrades;

        } catch (error) {
            console.error("Error cargando datos de habitages turísticos:", error);
            return null;
        }
    },

    getDadesMunicipis: async () => {
        try {
            const data = await apiService.getHabTuristics();

            // Agrupar por municipio y sumar el total
            const agregados = data.reduce((acc, item) => {
                const municipi = item.poblacio; // o item.municipi si prefieres
                if (!acc[municipi]) {
                    acc[municipi] = 0;
                }
                acc[municipi] += item.total;
                return acc;
            }, {});

            // Convertir objeto en array para el gráfico
            return Object.keys(agregados).map(municipi => ({
                municipi,
                cantidadHabitages: agregados[municipi]
            }));
        } catch (error) {
            console.error('Error obteniendo datos de municipios:', error);
            return [];
        }
    }

}

export default estadistiquesController;