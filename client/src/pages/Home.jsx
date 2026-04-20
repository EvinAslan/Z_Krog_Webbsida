import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <section className="hero-content">

        <div className="center-text">
          <h1 className="restaurant-name">Z-KROG</h1>
          <h2 className="restaurant-sub">RESTAURANG &amp; PIZZERIA</h2>
          <h3 className="restaurant-rights">FULLSTÄNDIGA RÄTTIGHETER</h3>
        </div>
        <div className="hero-buttons">
         <Link to="/menu" className="hero-btn" onClick={() => { sessionStorage.removeItem('valdKategori'); sessionStorage.removeItem('menyScroll'); sessionStorage.removeItem('lastViewedCategory'); }}>Meny</Link>
         <a href="#" className="hero-btn" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-facebook-modal')); }}>Veckans Lunch</a>
        </div>

        <div className="logo-wrapper">
          <img
            src="/imges/z.png"
            alt="Z logo"
            className="z-logo"
          />
        </div>

      </section>

    </div>
  );
}