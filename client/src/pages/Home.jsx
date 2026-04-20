import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <section className="hero-content">

        {/* Animated Background Slider mimicking Video */}
        <div className="hero-video-slider">
          <div className="hero-slide"></div>
          <div className="hero-slide"></div>
          <div className="hero-slide"></div>
          <div className="hero-overlay"></div>
        </div>

        <div className="center-text position-relative" style={{ zIndex: 2 }}>
          <h1 className="restaurant-name mb-0">Z-KROG</h1>

          <div className="logo-wrapper my-3" style={{ animation: 'fadeIn 1s ease-in' }}>
            <img
              src="/imges/z.png"
              alt="Z logo"
              className="z-logo-center"
            />
          </div>

          <h2 className="restaurant-sub">RESTAURANG &amp; PIZZERIA</h2>
          <div className="mt-3 mb-4">
            <span className="badge bg-dark border border-secondary text-light px-3 py-2" style={{ letterSpacing: '0.1rem', fontSize: '0.9rem', opacity: 0.9 }}>
              FULLSTÄNDIGA RÄTTIGHETER
            </span>
          </div>
        </div>

        <div className="hero-buttons position-relative" style={{ zIndex: 2, marginTop: '1rem' }}>
          <Link to="/menu" className="hero-btn" onClick={() => { sessionStorage.removeItem('valdKategori'); sessionStorage.removeItem('menyScroll'); sessionStorage.removeItem('lastViewedCategory'); }}>Meny</Link>
          <a href="#" className="hero-btn" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-facebook-modal')); }}>Veckans Lunch</a>
        </div>

      </section>

    </div>
  );
}