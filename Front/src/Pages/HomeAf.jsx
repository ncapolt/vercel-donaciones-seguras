import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '/src/Components/NavBar';
import './HomeAf.css';

function HomeAf() {
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
      <div className="body-content-af">
        <div className="welcome-section-af">
          <h1 className="welcome-greeting-af">Hola, {userName}!</h1>
          <p className="welcome-subtitle-af">Necesitas ayuda? Estas campañas te podrían servir!</p>
          <div className="campaigns-container-af">
            {userCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="campaign-row-af"
                onClick={() => handleChooseCampaign(campaign.id)}
              >
                <div className="campaign-info-af">
                  <span className="campaign-name-af">{campaign.name}</span>
                </div>
                <div className="choose-indicator-af">
                  Elegir
                </div>
                {index < userCampaigns.length - 1 && <div className="campaign-separator-af"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAf;