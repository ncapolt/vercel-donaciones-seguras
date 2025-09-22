import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeOg from './Pages/HomeOg';
import NuevaCampaña from './Pages/NuevaCampaña';
import HomeAf from './Pages/HomeAf';
import Login from './Pages/Login';
import User from './Pages/User';
import Registro from './Pages/Registro';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/nueva-campana" element={<NuevaCampaña />} />
        <Route path="/homeaf" element={<HomeAf />} />
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Registro />} />
      </Routes>
    </Router>
  </StrictMode>,
)
