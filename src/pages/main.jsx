import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Join from "./pages/Join";
import Cardio from "./pages/ServiceDetail/CardioHealthDetailsSection";
import Equipment from "./pages/ServiceDetail/EquipmentDetailsSection";
import Group from "./pages/ServiceDetail/GroupClassesSection";
import Training from "./pages/ServiceDetail/TrainingOverviewSection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/join" element={<Join />} />

                {/* Service detail pages */}
                <Route path="/services/cardio" element={<Cardio />} />
                <Route path="/services/equipment" element={<Equipment />} />
                <Route path="/services/group" element={<Group />} />
                <Route path="/services/training" element={<Training />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;