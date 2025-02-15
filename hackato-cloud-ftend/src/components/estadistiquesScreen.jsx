import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import HabitagesChart from '../charts/HabitatgesChart.jsx';
import ChartsGrid from "../charts/ChartGrid.jsx"; // Asegúrate de importar el componente HabitagesChart

const estadistiquesScreen = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar fijo arriba */}
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top w-100 shadow px-4">
                <Navbar.Brand as={Link} to="/">TgnInfoVivienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/mapa">Mapa interactivo</Nav.Link>
                        <Nav.Link as={Link} to="/estadisticas">Estadísticas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="App">
                <h1>Estadísticas de Habitages Turísticos</h1>
                <ChartsGrid />
            </div>

            <footer className="bg-dark text-white w-100 text-center d-flex justify-content-center align-items-center"
                    style={{ height: "50px", position: "fixed", bottom: "0", left: "0", right: "0" }}>
                <p className="m-0">Creado por Ivan Arenal, Angelina Ruíz y Josep Lluís Marin - Universitat Rovira i Virgili (URV)</p>
            </footer>
        </div>
    );
};

export default estadistiquesScreen; // Asegúrate de exportar correctamente el componente estadistiquesScreen
