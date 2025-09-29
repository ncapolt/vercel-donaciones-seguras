import './NavBar.css';
import logo from '../Images/Logo.png';
import { useNavigate } from 'react-router-dom';

// Avatar genérico de usuario (SVG inline)
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNmM2Y0ZjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iIzljYTNhZiIvPgo8cGF0aCBkPSJNMTAgMzJDMTAgMjcuNTgyIDE0LjU4MiAyMyAyMCAyM0MyNS40MTggMjMgMzAgMjcuNTgyIDMwIDMyVjM0SDEwVjMyWiIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4K';

function NavBar({ avatarUrl, showAvatar = true }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo Donaciones Seguras" className="navbar-logo" />
      </div>
      {showAvatar && (
        <div className="navbar-right">
          <img
            src={avatarUrl || DEFAULT_AVATAR}
            alt="Avatar usuario"
            className="navbar-avatar"
            onClick={() => navigate('/user')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
