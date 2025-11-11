import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './VerificarEmail.css';

const VerificarEmail = () => {
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtener email de los parámetros de la URL o del estado de navegación
    const urlParams = new URLSearchParams(location.search);
    const emailFromUrl = urlParams.get('email');
    const emailFromState = location.state?.email;
    
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else if (emailFromState) {
      setEmail(emailFromState);
    }

    // Iniciar contador de 15 minutos
    setTimeLeft(15 * 60); // 15 minutos en segundos
  }, [location]);

  useEffect(() => {
    // Contador regresivo
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerificar = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!codigo || !email) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    if (codigo.length !== 6) {
      setError('El código debe tener 6 dígitos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/verificacion/verificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, codigo })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al verificar el código');
      }

      alert('Email verificado exitosamente!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    if (!email) {
      setError('Email es requerido para reenviar el código');
      return;
    }

    setResending(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/verificacion/reenviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al reenviar el código');
      }

      // Reiniciar contador
      setTimeLeft(15 * 60);
      alert('Código reenviado exitosamente!');
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <NavBar showAvatar={false} />
      <div className="body-content">
        <div className="verificar-email-container">
          <div className="verificar-email-content">
            <h1 className="verificar-email-title">Verificar Email</h1>
            
            <div className="verificar-email-info">
              <p>Hemos enviado un código de verificación de 6 dígitos a:</p>
              <strong>{email}</strong>
            </div>

            <form onSubmit={handleVerificar} className="verificar-email-form">
              <div className="form-group">
                <label htmlFor="codigo">Código de verificación:</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength="6"
                  required
                  className="codigo-input"
                />
              </div>

              {timeLeft > 0 && (
                <div className="timer-info">
                  El código expira en: <span className="timer">{formatTime(timeLeft)}</span>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="verificar-button" 
                disabled={loading || timeLeft === 0}
              >
                {loading ? 'Verificando...' : 'Verificar Email'}
              </button>
            </form>

            <div className="verificar-email-actions">
              <button 
                className="reenviar-button" 
                onClick={handleReenviar}
                disabled={resending || timeLeft > 0}
              >
                {resending ? 'Reenviando...' : 'Reenviar código'}
              </button>
              
              <button 
                className="back-button" 
                onClick={() => navigate('/signin-organizador')}
              >
                Volver al registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificarEmail;






