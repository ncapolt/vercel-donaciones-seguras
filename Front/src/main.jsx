import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeOg from './Pages/HomeOg';
import CampaignDetail from './Pages/CampaignDetail';
import CampaignProducts from './Pages/CampaignProducts';
import NuevoProducto from './Pages/NuevoProducto';
import EditarProducto from './Pages/EditarProducto';
import NuevaCampaña from './Pages/NuevaCampaña';
import HomeAf from './Pages/HomeAf';
import Login from './Pages/Login';
import User from './Pages/User';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';
import SignInAfectado from './Pages/SignInAfectado';
import SignInOrganizador from './Pages/SignInOrganizador';
import ElijaOpcion from './Pages/ElijaOpcion';
import Landing from './Pages/Landing';
import SignInAyudante from './Pages/SignInAyudante';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/campaign/:campaignId/products" element={<CampaignProducts />} />
        <Route path="/campaign/:campaignId/nuevo-producto" element={<NuevoProducto />} />
        <Route path="/producto/:productId/editar" element={<EditarProducto />} />
        <Route path="/nueva-campana" element={<NuevaCampaña />} />
        <Route path="/homeaf" element={<HomeAf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/signin-afectado" element={<SignInAfectado />} />
        <Route path="/signin-organizador" element={<SignInOrganizador />} />
        <Route path="/elija-opcion" element={<ElijaOpcion />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signin-ayudante" element={<SignInAyudante />} />
      </Routes>
    </Router>
  </StrictMode>,
)
