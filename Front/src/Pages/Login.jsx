import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrNombre: '',
    contraseña: ''
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

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirigir según el tipo de usuario
        if (data.usuario.tipo_usuario_id === 1) {
          navigate('/homeaf'); // Usuario afiliado
        } else {
          navigate('/'); // Usuario organizador
        }
      } else {
        setError(data.error || 'Error en el login');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-section">
          <h1>DONACIONES SEGURAS</h1>
          <div className="logo-icon">🤝</div>
        </div>
        <h2>LOG IN</h2>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="emailOrNombre">Mail/Nombre:</label>
          <input
            type="text"
            id="emailOrNombre"
            name="emailOrNombre"
            value={formData.emailOrNombre}
            onChange={handleChange}
            placeholder="Ingrese su mail o nombre aquí..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">PassWord:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Ingrese su contraseña aquí..."
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-links">
          <a href="/registro" className="link">No tiene cuenta? Regístrese.</a>
          <a href="/recuperar" className="link">Me he olvidado mi contraseña.</a>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Log In'}
        </button>
      </form>

      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
    </div>
  );
};

export default Login;

