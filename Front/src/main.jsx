import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeOg from './Pages/HomeOg';
import NuevaCampaña from './Pages/NuevaCampaña';
import HomeAf from './Pages/HomeAf';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomeOg />} />
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/nueva-campaña" element={<NuevaCampaña />} />
        <Route path="/nueva-campana" element={<NuevaCampaña />} />
        <Route path="/homeaf" element={<HomeAf />} />
      </Routes>
    </Router>
  </StrictMode>,
)
