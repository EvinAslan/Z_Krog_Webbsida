export default function About() {
  return (
    <div className="about-page">

      <span className="restaurant-highlight">Z-krog</span>
      <img 
        src="/imges/z.png" 
        alt="Z logo" 
        className="about-logo"
      />

      {/* Text */}
      <p className="about-text">
        Z-krog finns i Korsnäs/ Falun i cirka 40 år och den serverar läckra mat
        rätter bland annat À LA CARTE, PIZZA, PASTA, HAMBURGARE,
        SALLADER OCH KEBABRÄTTER. Vår hemlighet ligger i våra råvaror
        som är av högsta kvalitet och naturligtvis skickliga händer som
        ger maten den unika smaken.
      </p>

      <h3 className="about-welcome">Hjärtligt välkomna!</h3>

    </div>
  );
}