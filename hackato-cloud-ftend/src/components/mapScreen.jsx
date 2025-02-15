import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/MapScreen.css";
import {geoJsonTarragones} from "../geojson/geoJsonTarragones.js";
import mapController from '../controllers/mapController';
import { useEffect, useState } from 'react';


const MapScreen = () => {
    // Componente para centrar el mapa automáticamente
    const CenterMap = () => {
        const map = useMap();

        // Centrar el mapa cuando se monta o actualiza
        map.setView([41.15, 1.1], map.getZoom());

        return null;
    };

    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await mapController.getGeojsonWithRentData();
            setGeoData(data);
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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

            <div style={{ marginTop: "100px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Mapa interactivo</h2>
                <div style={{ width: "75vw", height: "65vh", border: "3px solid #ccc", borderRadius: "15px", padding: "10px", backgroundColor: "#f9f9f9", boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.2)" }}>
                    <MapContainer center={[41.15, 1.1]} zoom={10} style={{ width: "100%", height: "100%" }}>
                        <CenterMap />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© OpenStreetMap contributors'
                        />

                        {/* Capa base del Tarragonès */}
                        <GeoJSON data={geoJsonTarragones} style={{ color: "#000", weight: 1, fillColor: "#007967", fillOpacity: 0.2 }} />

                        {/* Capa superpuesta con datos de alquiler */}
                        {geoData && (
                            <GeoJSON
                                data={geoData}
                                style={() => ({
                                    color: "#000",
                                    weight: 2,
                                    fillColor: "#ff0000",
                                    fillOpacity: 0.4
                                })}
                                onEachFeature={(feature, layer) => {
                                    if (feature.properties) {
                                        const { nomTerritori, tramPreus, renda } = feature.properties;
                                        layer.bindPopup(`<h3>${nomTerritori}</h3>
                                     <p>Renda: ${renda} €/mes</p>
                                     <p>Preu: ${tramPreus}</p>`);
                                    }
                                }}
                            />
                        )}
                    </MapContainer>

                </div>
            </div>

            <footer className="bg-dark text-white w-100 text-center d-flex justify-content-center align-items-center" style={{ height: "50px", position: "fixed", bottom: "0", left: "0", right: "0" }}>
                <p className="m-0">Creado por Ivan Arenal, Angelina Ruíz y Josep Lluís Marin - Universitat Rovira i Virgili (URV)</p>
            </footer>
        </div>
    );
};

export default MapScreen;