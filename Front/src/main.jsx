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
import RecuperarContraseña from './Pages/RecuperarContraseña';
import SignInAfectado from './Pages/SignInAfectado';
import ElijaOpcion from './Pages/ElijaOpcion';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/nueva-campana" element={<NuevaCampaña />} />
        <Route path="/homeaf" element={<HomeAf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/signin-afectado" element={<SignInAfectado />} />
        <Route path="/elija-opcion" element={<ElijaOpcion />} />
        <Route path="/" element={<Registro />} />
      </Routes>
    </Router>
  </StrictMode>,
)
