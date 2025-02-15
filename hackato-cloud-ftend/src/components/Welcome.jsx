import "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Welcome() {
    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="w-100 shadow px-4">
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

            {/* Bienvenida */}
            <div
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center text-white p-5"
                style={{
                    backgroundImage: "url('https://motionarray.imgix.net/preview-153079-sqrLkU8S22-high_0004.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "darken",
                    backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}
            >
                <h1 className="display-4 fw-bold">Bienvenido a TgnInfoVivienda</h1>
                <p className="lead w-75">
                    Este proyecto tiene como objetivo concienciar a la sociedad sobre la situación actual del mercado de la vivienda en la comarca del
                    Tarragonés. Queremos promover el acceso justo a la vivienda mediante datos actualizados y análisis detallados.
                </p>
                <Button variant="primary" className="mt-4">Empezar</Button>
            </div>

            {/* Footer */}
            <footer className="text-center p-3 bg-dark text-white mt-0">
                Creado por Ivan Arenal, Angelina Ruíz y Josep Lluís Marin - Universitat Rovira i Virgili (URV)
            </footer>
        </div>
    );
}


