// ChartsGrid.js
import HabitagesChart from './HabitatgesChart.jsx';
import '../css/styles.css';

const ChartsGrid = () => {
    const charts = [
        { id: 'chart1', title: 'Gráfico 1' },
        { id: 'chart2', title: 'Gráfico 2' },
        { id: 'chart3', title: 'Gráfico 3' },
        { id: 'chart4', title: 'Gráfico 4' },
    ];

    return (
        <div className="charts-grid">
            {charts.map(chart => (
                <HabitagesChart key={chart.id} chartId={chart.id} title={chart.title} />
            ))}
        </div>
    );
};

export default ChartsGrid;
