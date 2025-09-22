import { useNavigate } from 'react-router-dom';
import logo from '../Images/Logo.png';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();

  const handleOrganizadorClick = () => {
    navigate('/login');
  };

  const handleAfectadoClick = () => {
    navigate('/login');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="signin-container">
      {/* Header con logo */}
      <div className="signin-header">
        <div className="signin-logo">
          <img src={logo} alt="Logo Donaciones Seguras" className="signin-logo-img" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="signin-content">
        <h1 className="signin-title">Registro</h1>
        <p className="signin-subtitle">Primero necesitamos saber qué sos</p>
        
        {/* Botones de opción */}
        <div className="signin-buttons">
          <button 
            className="signin-btn organizador-btn" 
            onClick={handleOrganizadorClick}
          >
            Organizador
          </button>
          <button 
            className="signin-btn afectado-btn" 
            onClick={handleAfectadoClick}
          >
            Afectado
          </button>
        </div>

        {/* Enlace de login */}
        <div className="signin-login-link">
          <span className="login-text">Ya tiene cuenta? </span>
          <button className="login-link" onClick={handleLoginClick}>
            Ingresar.
          </button>
        </div>
      </div>

      {/* Botón de retroceso */}
      <button className="signin-back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default SignIn;
