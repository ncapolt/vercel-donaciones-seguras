import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '/src/Components/NavBar';
import './NuevaCampaña.css';

function NuevaCampaña() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: lógica para agregar campaña
  };

  return (
    <div className="nueva-campania-bg">
      <NavBar />
      <form className="nueva-campania-form" onSubmit={handleSubmit}>
        <h1 className="nueva-campania-title">Nueva Campaña</h1>
        <label className="nueva-campania-label">Nombre:
          <input
            className="nueva-campania-input"
            type="text"
            placeholder="Ingrese nombre aquí..."
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </label>
        <div className="nueva-campania-row">
          <label className="nueva-campania-label">Localidad:
            <input
              className="nueva-campania-input"
              type="text"
              placeholder="Ingrese localidad aquí..."
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
            />
          </label>
          <label className="nueva-campania-label">Provincia:
            <select
              className="nueva-campania-select"
              value={provincia}
              onChange={e => setProvincia(e.target.value)}
            >
              <option value="">Elegir</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Santa Fe">Santa Fe</option>
              {/* Agrega más provincias si quieres */}
            </select>
          </label>
        </div>
        <label className="nueva-campania-label">Motivo:
          <input
            className="nueva-campania-input"
            type="text"
            placeholder="Ingrese motivo aquí..."
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
          />
        </label>
        <button className="nueva-campania-btn" type="submit">
          <span className="nueva-campania-btn-icon">+</span>Agregar
        </button>
        <button type="button" className="nueva-campania-back" onClick={() => navigate('/')}>{'<'} </button>
      </form>
    </div>
  );
}

export default NuevaCampaña;