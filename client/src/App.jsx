import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Meny.jsx'
import Lunch from './pages/Lunch.jsx'
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
    // Polling var 500ms som backup (storage-event triggas ej inom samma flik)
    const interval = setInterval(updateCount, 500);
    return () => { window.removeEventListener('storage', updateCount); clearInterval(interval); };
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
                    <Link className="nav-link active fw-semibold" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/menu">Meny</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/lunch">Veckans Lunch</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/about">Om oss</Link>
                  </li>
                  {/* Kundvagn alltid synlig i navbaren */}
                  <li className="nav-item cheackout-stats">
                    <Link className="nav-link btn fw-bold ms-2 px-3 cheackout" to="/checkout"><p className='cheackout'>Varukorg</p>{cartCount > 0 && <span className="badge bg-dark ms-1">{cartCount}</span>}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          {/* Här byter sig sidan beroende på URL */}
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/about"   element={<About />} />
            <Route path="/menu"   element={<Menu />} />
            <Route path="/lunch"   element={<Lunch />} />
            <Route path="/singIn"   element={<Singin />} />
            <Route path="/admin"   element={<Admin />} />
            <Route path="/product/:id"   element={<ProductDetail />} />
            <Route path="/cheackout" element={<Checkout />}/>
            <Route path="/checkout" element={<Checkout />}/>

          </Routes>

            <footer className="site-footer">
              <div className="container">
                <div className="row align-items-center text-center text-md-start">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <h5 className="footer-title mb-2">Z krog Restaurang</h5>
                    <p className="mb-0 footer-text">God mat, snabb service och en meny för hela familjen</p>
                    <p className="footer-phone">📞 023-344 41</p>
                    <li> 
                         <a 
                           href="https://facebook.com" 
                           target="_blank" 
                            className="footer-link"
                            >
                            <i className="fa-brands fa-facebook"></i> Facebook
                          </a>
                       </li>
                  </div>

                  <div className="col-md-6">
                    <ul className="footer-links list-unstyled d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-3 mb-0">
                      <li><Link className="nav-link" to="/singIn">Admin login</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
        </BrowserRouter>
    </>
  )
}

export default App