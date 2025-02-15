import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import estadistiquesController from '../controllers/estadistiquesController';

Chart.register(...registerables);

const HabitagesChart = ({ chartId, title }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Referencia al gráfico

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const datos = await estadistiquesController.getDadesHabitagesTuristics();
                if (datos && datos.length > 0) {
                    const labels = datos.map(item => item.label);
                    const values = datos.map(item => item.value);
                    setChartData({ labels, values });
                } else {
                    setError('No se encontraron datos.');
                }
            } catch (error) {
                setError('Error al obtener los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData) {
            const canvas = document.getElementById(chartId);

            // Verificar si el canvas está disponible
            if (!canvas) {
                console.error(`El canvas con id "${chartId}" no se encontró en el DOM.`);
                return;
            }

            const ctx = canvas.getContext('2d');

            if (chartRef.current) {
                chartRef.current.destroy(); // Destruir gráfico anterior
            }

            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: 'Quantitat d\'habitatges turístics per any',
                            data: chartData.values,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    layout: {
                        padding: {
                            left: 20,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    }, [chartData, chartId]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header">
                <h5 className="card-title">{title}</h5>
            </div>
            <div className="card-body">
                <canvas id={chartId} style={{ height: "300px" }}></canvas>
            </div>
        </div>
    );
};

export default HabitagesChart;
