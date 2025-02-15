import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MapScreen = () => {
    const [geojsonData, setGeojsonData] = useState(null);

    useEffect(() => {
        const fetchGeojson = async () => {
            try {
                const response = await fetch("./geojson/tarragones.geojson");
                const data = await response.json();
                setGeojsonData(data);
            } catch (error) {
                console.error("Error cargando el GeoJSON:", error);
            }
        };
        fetchGeojson();
    }, []);

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

            {/* Espaciador para evitar que el contenido quede oculto detrás del Navbar */}
            <div style={{ marginTop: "80px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Mapa de Tarragonès</h2>
                <div style={{ width: "80%", maxWidth: "900px", height: "60vh", border: "2px solid #ccc", borderRadius: "10px", overflow: "hidden", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)" }}>
                    <MapContainer center={[41.15, 1.1]} zoom={10} style={{ width: "100%", height: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {geojsonData && <GeoJSON data={geojsonData} />}
                    </MapContainer>
                </div>
            </div>

            <footer className="bg-dark text-white w-100 text-center d-flex justify-content-center align-items-center"
                    style={{ height: "50px", position: "fixed", bottom: "0", left: "0", right: "0" }}>
                <p className="m-0">Creado por Ivan Arenal, Angelina Ruíz y Josep Lluís Marin - Universitat Rovira i Virgili (URV)</p>
            </footer>
        </div>
    );
};

export default MapScreen;
