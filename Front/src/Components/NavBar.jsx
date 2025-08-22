import './NavBar.css';
import logo from '../Images/Logo.png';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/40?img=3'; // Imagen preventiva

function NavBar({ avatarUrl }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo Donaciones Seguras" className="navbar-logo" />
        <div className="navbar-title">
        </div>
      </div>
      <div className="navbar-right">
        <img
          src={avatarUrl || DEFAULT_AVATAR}
          alt="Avatar usuario"
          className="navbar-avatar"
        />
      </div>
    </nav>
  );
}

export default NavBar;
