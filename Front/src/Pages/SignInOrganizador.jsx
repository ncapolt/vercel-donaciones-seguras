import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './SignInOrganizador.css';

const SignInOrganizador = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    localidad: '',
    provincia: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones básicas
    if (!formData.nombre || !formData.direccion || !formData.localidad || !formData.provincia) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Aquí iría la lógica para crear la ONG
      // Por ahora simulamos el proceso
      console.log('Datos de la ONG:', formData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('ONG registrada exitosamente!');
      navigate('/login');
      
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <NavBar showAvatar={false} />
      <div className="body-content">
        <div className="signin-organizador-container">
          {/* Contenido principal */}
          <div className="signin-organizador-content">
            <h1 className="signin-organizador-title">Nueva ONG</h1>
            
            <form onSubmit={handleSubmit} className="signin-organizador-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese nombre aquí..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ingrese su texto aquí..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="localidad">Localidad:</label>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleChange}
                    placeholder="Ingrese localidad aquí..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="provincia">Provincia:</label>
                  <select
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elegir</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">CABA</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Tucumán">Tucumán</option>
                    <option value="Salta">Salta</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Misiones">Misiones</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="La Pampa">La Pampa</option>
                  </select>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="continuar-button" disabled={loading}>
                {loading ? 'Registrando...' : 'Continuar'}
              </button>
            </form>
          </div>

          {/* Botón de retroceso */}
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInOrganizador;