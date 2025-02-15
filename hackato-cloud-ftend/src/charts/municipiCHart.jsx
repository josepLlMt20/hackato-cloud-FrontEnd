import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import estadistiquesController from '../controllers/estadistiquesController';
import Spinner from '../components/Spinner';

Chart.register(...registerables);

const HabitagesChart = ({ chartId, title }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datos = await estadistiquesController.getDadesMunicipis();

                if (datos && datos.length > 0) {
                    // Extrae municipios y la cantidad de habitages
                    const labels = datos.map(item => item.municipi);
                    const values = datos.map(item => item.cantidadHabitages);

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
            const ctx = canvasRef.current.getContext('2d');
            if (chartRef.current) chartRef.current.destroy();
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Cantidad de alojamientos turísticos',
                        data: chartData.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true }
                    },
                    layout: { padding: 10 },
                },
            });
        }
    }, [chartData]);

    if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}><Spinner /></div>;
    if (error) return <p>{error}</p>;

    return (
        <div className="card shadow-sm mb-4 p-3" style={{ maxWidth: '800px', margin: 'auto' }}>
            <div className="card-header text-center"><h6 className="card-title mb-0">{title}</h6></div>
            <div className="card-body">
                <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                    <canvas ref={canvasRef} id={chartId}></canvas>
                </div>
            </div>
        </div>
    );
};

export default HabitagesChart;
