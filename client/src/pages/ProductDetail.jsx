import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from '../utils/api'
import ProductRating from '../components/ProductRating';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState({});
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingsList, setRatingsList] = useState([]);

  useEffect(() => {
    fetch(`${API}/products/menu`)
      .then((res) => {
        if (!res.ok) throw new Error("Serverfel");
        return res.json();
      })
      .then((data) => {
        setMenuItem(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!menuItem || Object.keys(menuItem).length === 0) return;

    let foundProduct = null;
    let runningId = 1;

    Object.entries(menuItem).forEach(([catKey, category]) => {
      const [urlName, title, { price1, price2, price3, price4, imageClass, itemlist }] = category;

      Object.values(itemlist).forEach((itemData) => {
        const [namn, beskrivning, productId, avgRating, revCount, _p1, _p2, _p3, _p4, customImg] = itemData;

        if (String(runningId) === String(id)) {
          foundProduct = {
            productId,
            namn,
            beskrivning,
            img: (customImg && customImg.trim() !== "") ? customImg : imageClass,
            avgRating,
            revCount,
            categoryTitle: title,
          };
        }

        runningId++;
      });
    });

    setProduct(foundProduct);
    setLoading(false);

    if (foundProduct) {
      fetch(`${API}/products/${foundProduct.productId}`)
        .then(res => res.json())
        .then(data => {
          setRatingsList(data.ratings || []);
        })
        .catch(() => setRatingsList([]));
    }
  }, [menuItem, id]);

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <h2 className="text-light">Laddar produkt...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <h2 className="text-light mb-4">Produkten hittades inte</h2>
        <button onClick={() => navigate(-1)} className="btn btn-warning btn-lg rounded-pill px-5">
           Tillbaka
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-lg-10">
          
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)' }}>
            <div className="row g-0 align-items-stretch">
              
              <div className="col-md-5 d-flex align-items-center justify-content-center p-5" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                 <div className="position-relative">
                   <img 
                      src={product.img} 
                      alt={product.namn} 
                      className="img-fluid rounded-circle shadow-lg" 
                      style={{ width: '280px', height: '280px', objectFit: 'contain', background: '#f8f9fa', padding: '15px' }} 
                   />
                 </div>
              </div>
              
              <div className="col-md-7 p-5 d-flex flex-column text-light">
                 
                 <div className="mb-2">
                    <span className="badge text-dark fw-bold px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'var(--primary)', letterSpacing: '1px' }}>
                        {product.categoryTitle.toUpperCase()}
                    </span>
                 </div>
                 
                 <h1 className="fw-bolder mb-3 display-5" style={{ color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                     {product.namn}
                 </h1>
                 
                 <p className="fs-5 mb-4" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                     {product.beskrivning || "Ingen beskrivning tillgänglig för denna produkt."}
                 </p>

                 <hr className="mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                 
                 <div className="mb-5">
                    {ratingsList.length > 0 ? (
                      <div className="rounded-3 p-4" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                         <div className="d-flex justify-content-between align-items-center mb-3">
                             <h5 className="m-0 text-white d-flex align-items-center">
                                <i className="fa-solid fa-star text-warning me-2"></i> Kundbetyg
                             </h5>
                             <div className="text-end">
                                <h4 className="m-0 fw-bold" style={{ color: 'var(--primary)' }}>
                                    {Number(product.avgRating).toFixed(1)} <span className="fs-6 text-light opacity-50">/ 5</span>
                                </h4>
                                <small style={{ color: 'var(--text-muted)' }}>Baserat på {ratingsList.length} omdömen</small>
                             </div>
                         </div>
                         
                         <div className="ratings-history pe-2" style={{ maxHeight: '140px', overflowY: 'auto' }}>
                             {ratingsList.map((r, i) => (
                                 <div key={r.id} className="d-flex justify-content-between align-items-center py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                                     <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Omdöme {i + 1}</span>
                                     <div>
                                         {[1,2,3,4,5].map(star => (
                                             <i 
                                                key={star} 
                                                className={`fa-solid fa-star ${star <= r.rating ? 'text-warning' : ''}`} 
                                                style={{ fontSize: '0.85rem', margin: '0 1px', color: star > r.rating ? 'rgba(255,255,255,0.1)' : '' }}
                                             ></i>
                                         ))}
                                     </div>
                                 </div>
                             ))}
                         </div>
                      </div>
                    ) : (
                      <div className="rounded-3 p-4 text-center" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <i className="fa-regular fa-star mb-2 fs-3" style={{ color: 'var(--text-muted)' }}></i>
                          <p className="mb-0" style={{ color: 'var(--text-muted)' }}>Inga recensioner ännu för denna produkt.</p>
                      </div>
                    )}
                 </div>
                 
                 <div className="mt-auto pt-2">
                     <button onClick={() => navigate(-1)} className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold transition-all" style={{ borderWidth: '2px' }}
                           onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                           onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
                        <i className="fa-solid fa-arrow-left me-2"></i> Tillbaka
                     </button>
                 </div>
                 
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
