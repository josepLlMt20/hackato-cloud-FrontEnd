import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import MapScreen from "./components/mapScreen.jsx";
import Estadistiques from "./components/estadistiquesScreen.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/mapa" element={<MapScreen />} />
                <Route path="/estadisticas" element={<Estadistiques />} />
            </Routes>
        </Router>
    );
}

export default App;
