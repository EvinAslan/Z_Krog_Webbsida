import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Meny.jsx'
import Singin from './pages/Singin.jsx'
import Admin from './pages/Admin.jsx'
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import './App.css'

const CART_KEY = 'guestCart';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  // Läser kundvagn från localStorage så att räknaren syns i navbaren på alla sidor
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        setCartCount(cart.reduce((sum, item) => sum + item.amount, 0));
      } catch { setCartCount(0); }
    };
    updateCount();
    // Lyssnar på ändringar från Meny.jsx via storage-event
    window.addEventListener('storage', updateCount);
    
    // Lyssna på custom event för att öppna facebook-modalen från andra komponenter
    const handleOpenFbModal = () => setShowFacebookModal(true);
    window.addEventListener('open-facebook-modal', handleOpenFbModal);

    // Polling var 500ms som backup (storage-event triggas ej inom samma flik)
    const interval = setInterval(updateCount, 500);
    return () => { 
      window.removeEventListener('storage', updateCount); 
      window.removeEventListener('open-facebook-modal', handleOpenFbModal);
      clearInterval(interval); 
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {/* Navbar som alltid syns */}
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">Z krog Restaurang</Link>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink end className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/menu" onClick={() => { sessionStorage.removeItem('valdKategori'); sessionStorage.removeItem('menyScroll'); sessionStorage.removeItem('lastViewedCategory'); }}>Meny</NavLink>
                </li>
                <li className="nav-item">
                  <a href="#" className={`nav-link ${showFacebookModal ? 'active fw-semibold' : ''}`} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-facebook-modal')); }}>Veckans Lunch</a>
                </li>
                <li>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/about">Om oss</NavLink>
                </li>
                {/* Kundvagn alltid synlig i navbaren */}
                <li className="nav-item cheackout-stats">
                  <NavLink className={({ isActive }) => `nav-link btn fw-bold ms-2 px-3 d-flex align-items-center gap-1 cheackout ${isActive ? 'active' : ''}`} to="/checkout">
                    <span>Varukorg</span>
                    {cartCount > 0 && <span className="badge bg-dark">{cartCount}</span>}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Här byter sig sidan beroende på URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/singIn" element={<Singin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cheackout" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>

        <footer className="site-footer">
          <div className="container">
            <div className="row align-items-center text-center text-md-start">
              <div className="col-md-6 mb-3 mb-md-0">
                <h5 className="footer-title mb-2">Z krog Restaurang</h5>
                <p className="mb-0 footer-text">God mat, snabb service och en meny för hela familjen</p>
                <div className="d-flex align-items-center gap-3 flex-wrap mt-3 mb-3">
                  <div className="footer-badge">📞 023-344 41</div>
                  <a
                    href="https://www.facebook.com/falunzkrogen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-badge interactive gap-2"
                  >
                    <i className="fa-brands fa-facebook fs-5" style={{ color: '#1877F2' }}></i> Facebook
                  </a>
                </div>

              </div>

              <div className="col-md-6">
                <ul className="footer-links list-unstyled d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-3 mb-0">
                  <li>
                    <Link className="footer-badge interactive gap-2" to="/singIn">
                      <i className="fa-solid fa-lock fs-6" style={{ color: 'var(--text-muted)' }}></i> Admin login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* Facebook Feed Modal */}
        {showFacebookModal && (
          <div className="modal-backdrop" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }} onClick={() => setShowFacebookModal(false)}>
            <div className="modal-content text-start" style={{
              background: '#1a1a24', padding: '1.5rem', borderRadius: '1rem', position: 'relative', width: 'max-content', maxWidth: '95vw', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }} onClick={e => e.stopPropagation()}>
              <button
                className="btn-close btn-close-white"
                style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}
                onClick={() => setShowFacebookModal(false)}>
              </button>
              <h5 className="text-white mb-3 text-center fw-bold mt-2">Senaste från Facebook</h5>
              <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffalunzkrogen&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                  width="340"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                </iframe>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </>
  )
}

export default App