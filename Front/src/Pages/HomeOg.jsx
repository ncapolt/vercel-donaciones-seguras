import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './HomeOg.css';

function HomeOg() {
  const [userName, setUserName] = useState('');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/user')
      .then(res => res.json())
      .then(data => setUserName(data.name));

    fetch('http://localhost:3001/api/campaigns')
      .then(res => res.json())
      .then(data => setUserCampaigns(data));
  }, []);

  const handleChooseCampaign = (campaignId) => {
    // TODO: Implementar lógica para manejar la selección de campaña
    console.log(`Campaña seleccionada: ${campaignId}`);
  };

  return (
    <>
      <NavBar />
      <div className="body-content">
        <div className="welcome-section">
          <h1 className="welcome-greeting">Hola, {userName}!</h1>
          <p className="welcome-subtitle">Necesitas ayuda? Estas campañas te podrían servir!</p>
          <div className="campaigns-container">
            {userCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="campaign-row"
                onClick={() => handleChooseCampaign(campaign.id)}
              >
                <div className="campaign-info">
                  <span className="campaign-name">{campaign.name}</span>
                </div>
                <div className="choose-indicator">
                  Elegir
                </div>
                {index < userCampaigns.length - 1 && <div className="campaign-separator"></div>}
              </div>
            ))}
          </div>
          <button className="new-campaign-btn lower" onClick={() => navigate('/nueva-campaña')}>
            Nueva Campaña
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeOg;
