import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './CampaignProducts.css';

function CampaignProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const [campaignRes, productsRes] = await Promise.all([
          fetch(`http://localhost:3000/api/campaigns/${id}`),
          fetch(`http://localhost:3000/api/productos/by-campaign/${id}`)
        ]);
        if (!campaignRes.ok) throw new Error('No se pudo cargar la campaña');
        if (!productsRes.ok) throw new Error('No se pudieron cargar los productos');
        const campaign = await campaignRes.json();
        const prods = await productsRes.json();
        if (!isMounted) return;
        setCampaignName(campaign.nombre);
        setProducts(prods);
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="campaign-products-container">
        <h1 className="title">Productos cargados</h1>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="products-table-wrap">
            <div className="products-table">
              <div className="table-row table-header">
                <div className="col producto">Producto</div>
                <div className="col destino">Destino</div>
                <div className="col condicion">Condición</div>
              </div>
              {products.length === 0 ? (
                <div className="empty">No hay productos cargados aún.</div>
              ) : (
                products.map((p, idx) => (
                  <div key={p.id} className={`table-row ${idx % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                    <div className="col producto">
                      <span className="product-name">{p.nombre}</span>
                    </div>
                    <div className="col destino">
                      <span className="truncate">{p.destino || 'Comunidad...'}</span>
                    </div>
                    <div className="col condicion">
                      <span className={`status ${p.estado || 'libre'}`}>{(p.estado || 'Libre').toString().replace(/^./, c => c.toUpperCase())}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="actions">
              <button className="primary" onClick={() => {/* abrir form nuevo producto */}}>Nuevo Producto</button>
              <button className="secondary" onClick={() => {/* marcar entrega */}}>Entregar pedido</button>
            </div>
          </div>
        )}

        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">◀</button>
      </div>
    </>
  );
}

export default CampaignProducts;


