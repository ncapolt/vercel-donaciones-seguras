import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './CampaignProducts.css';

function CampaignProducts() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaignError, setCampaignError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [isOrganizador, setIsOrganizador] = useState(false);

  // Verificar si el usuario es organizador
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const userData = JSON.parse(usuario);
        setIsOrganizador(userData.tipo_usuario_id === 2);
      } catch (e) {
        console.error('Error parsing usuario:', e);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        setCampaignError(null);
        setProductsError(null);

        // Cargar campaña y productos por separado para mejor manejo de errores
        try {
          const campaignRes = await fetch(`http://localhost:3000/api/campaigns/${campaignId}`);
          if (!campaignRes.ok) {
            const errorData = await campaignRes.json().catch(() => ({}));
            throw new Error(errorData.error || `Error ${campaignRes.status}: No se pudo cargar la campaña`);
          }
          const campaign = await campaignRes.json();
          if (isMounted) setCampaignName(campaign.nombre);
        } catch (e) {
          if (isMounted) setCampaignError(e.message);
          console.error('Error cargando campaña:', e);
        }

        try {
          const productsRes = await fetch(`http://localhost:3000/api/productos/by-campaign/${campaignId}`);
          if (!productsRes.ok) {
            const errorData = await productsRes.json().catch(() => ({}));
            throw new Error(errorData.error || `Error ${productsRes.status}: No se pudieron cargar los productos`);
          }
          const prods = await productsRes.json();
          if (isMounted) setProducts(prods || []);
        } catch (e) {
          if (isMounted) setProductsError(e.message);
          console.error('Error cargando productos:', e);
          if (isMounted) setProducts([]); // Lista vacía si falla
        }
      } catch (e) {
        if (isMounted) setError(e.message);
        console.error('Error general:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (campaignId) {
      load();
    } else {
      setError('ID de campaña no proporcionado');
      setLoading(false);
    }
    return () => { isMounted = false; };
  }, [campaignId]);

  return (
    <>
      <NavBar />
      <div className="campaign-products-container">
        <h1 className="title">Productos cargados</h1>

        {loading && <p>Cargando...</p>}
        
        {(error || campaignError) && (
          <div className="error-message">
            <p className="error">{error || campaignError}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>
              Verifica que el backend esté corriendo en http://localhost:3000
            </p>
          </div>
        )}

        {productsError && !campaignError && (
          <p className="error" style={{ fontSize: '0.9rem' }}>⚠️ {productsError}</p>
        )}

        {!loading && (
          <div className="products-table-wrap">
            {campaignName && <h2 style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.9 }}>{campaignName}</h2>}
            
            <div className={`products-table ${isOrganizador ? 'with-actions' : ''}`}>
              <div className="table-row table-header">
                <div className="col producto">Producto</div>
                <div className="col destino">Destino</div>
                <div className="col condicion">Condición</div>
                <div className="col estado">Estado</div>
                {isOrganizador && <div className="col acciones">Acciones</div>}
              </div>
              {products.length === 0 ? (
                <div className="empty">No hay productos cargados aún.</div>
              ) : (
                products.map((p, idx) => {
                  const condicionLabel = p.estado === 'N' ? 'Nuevo' : p.estado === 'U' ? 'Usado' : p.estado || 'Nuevo';
                  const estadoProducto = p.estado_producto || 'libre';
                  const estadoLabels = {
                    'libre': 'Libre',
                    'reservado': 'Reservado',
                    'en_camino': 'En Camino',
                    'en_destino': 'En Destino',
                    'entregado': 'Entregado'
                  };
                  const estadoLabel = estadoLabels[estadoProducto] || estadoProducto;
                  return (
                    <div key={p.id} className={`table-row ${idx % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                      <div className="col producto">
                        <span className="product-name">{p.nombre}</span>
                      </div>
                      <div className="col destino">
                        <span className="truncate">{p.destino || 'Comunidad...'}</span>
                      </div>
                      <div className="col condicion">
                        <span>{condicionLabel}</span>
                      </div>
                      <div className="col estado">
                        <span className={`estado-badge estado-${estadoProducto}`}>{estadoLabel}</span>
                      </div>
                      {isOrganizador && (
                        <div className="col acciones">
                          <button 
                            className="edit-btn"
                            onClick={() => navigate(`/producto/${p.id}/editar`)}
                            title="Editar producto"
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {campaignId && (
              <div className="actions">
                <button className="primary" onClick={() => navigate(`/campaign/${campaignId}/nuevo-producto`)}>Nuevo Producto</button>
                <button className="secondary" onClick={() => {/* marcar entrega */}}>Entregar pedido</button>
              </div>
            )}
          </div>
        )}

        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">◀</button>
      </div>
    </>
  );
}

export default CampaignProducts;


