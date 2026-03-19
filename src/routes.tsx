import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Services from "./pages/Services";
import Modern from "./pages/Modern";
import PersonalTraining from "./pages/PersonalTraining";
import CardioHealth from "./pages/cardiohealth";
import Groupclass from "./pages/Groupclass";
import PricingPlansSection from "./pages/PricingPlansSection.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/join", element: <Join /> },
  { path: "/services", element: <Services /> },
  { path: "/modern-equipment", element: <Modern /> },
  { path: "/personal-training", element: <PersonalTraining /> },
  { path: "/cardio-health", element: <CardioHealth /> },
  { path: "/group-classes", element: <Groupclass /> },
  { path: "/pricing", element: <PricingPlansSection /> },
]);

export default router;
