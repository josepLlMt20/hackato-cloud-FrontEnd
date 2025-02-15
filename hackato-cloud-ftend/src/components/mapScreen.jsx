import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/MapScreen.css";
import { geoJsonTarragones } from "../geojson/geoJsonTarragones.js";
import mapController from '../controllers/mapController';
import { useEffect, useState } from 'react';

const MapScreen = () => {
    const CenterMap = () => {
        const map = useMap();
        map.setView([41.15, 1.1], map.getZoom());
        return null;
    };

    const [geoData, setGeoData] = useState(null);
    const [parkingBusData, setParkingBusData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //const rentData = await mapController.getGeojsonWithRentData();
            let rentData = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": { "name": "Tarragona" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.214599, 41.142986], [1.220047, 41.135368], [1.233296, 41.129169],
                                    [1.243282, 41.127425], [1.257058, 41.129601], [1.267657, 41.135075],
                                    [1.271693, 41.144256], [1.269154, 41.155098], [1.258945, 41.161948],
                                    [1.246710, 41.162808], [1.233819, 41.159375], [1.224254, 41.153874],
                                    [1.214599, 41.142986]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "Reus" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.09478, 41.16213], [1.10654, 41.15257], [1.12344, 41.15133],
                                    [1.13711, 41.15527], [1.14558, 41.16577], [1.13792, 41.17685],
                                    [1.12172, 41.17944], [1.10856, 41.17528], [1.09478, 41.16213]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "Salou" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.13267, 41.07042], [1.14390, 41.06412], [1.16048, 41.06328],
                                    [1.17323, 41.06789], [1.17840, 41.07682], [1.17100, 41.08534],
                                    [1.15368, 41.08890], [1.13985, 41.08516], [1.13267, 41.07042]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "El Vendrell" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.53010, 41.23391], [1.54203, 41.22749], [1.55684, 41.22992],
                                    [1.56764, 41.23907], [1.56388, 41.25088], [1.54752, 41.25494],
                                    [1.53494, 41.25072], [1.53010, 41.23391]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "El Catllar" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.32742, 41.17512], [1.34021, 41.17048], [1.35537, 41.17293],
                                    [1.36648, 41.18090], [1.36184, 41.19237], [1.34723, 41.19648],
                                    [1.33229, 41.19294], [1.32742, 41.17512]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "Torredembarra" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.39712, 41.14738], [1.41031, 41.14321], [1.42564, 41.14567],
                                    [1.43658, 41.15342], [1.43148, 41.16589], [1.41734, 41.17152],
                                    [1.40412, 41.16632], [1.39712, 41.14738]
                                ]
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": { "name": "Vila-seca" },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [1.14123, 41.11567], [1.15298, 41.10843], [1.16974, 41.10923],
                                    [1.18346, 41.11592], [1.18023, 41.12745], [1.16234, 41.13212],
                                    [1.14896, 41.12872], [1.14123, 41.11567]
                                ]
                            ]
                        }
                    }
                ]
            }


            setGeoData(rentData);

            const transportData = await mapController.getParkingsAndBusStops();
            setParkingBusData(transportData);
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

                        {/* Capa con datos de alquiler */}
                        {geoData && (
                            <GeoJSON
                                data={geoData}
                                style={() => ({
                                    color: "#000",
                                    weight: 2,
                                    fillColor: "#ff0000",
                                    fillOpacity: 0.4
                                })}
                            />
                        )}

                        {/* Capa con parkings y paradas de autobús */}
                        {parkingBusData && (
                            <GeoJSON
                                data={parkingBusData}
                                pointToLayer={(feature, latlng) => {
                                    return L.circleMarker(latlng, {
                                        radius: 6,
                                        fillColor: feature.properties.type === 'Parking' ? "#0000FF" : "#008000",
                                        color: "#000",
                                        weight: 1,
                                        opacity: 1,
                                        fillOpacity: 0.8
                                    }).bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties.address || `Capacidad: ${feature.properties.capacity}`}`);
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
