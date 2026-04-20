export default function About() {
  return (
    <div className="about-page-elite">
      <div className="container py-5">
        {/* Header Section */}
        <div className="row justify-content-center text-center mb-5">
           <div className="col-lg-8">
              <h2 className="display-4 fw-bold elite-title mt-4">Z-krog Restaurangen</h2>
              <div className="title-separator mx-auto my-4"></div>
              <p className="elite-subtitle">
                Vi vet att känslan före och efter maten är lika viktig. Välkommen! 
                En atmosfär som ger maten exakt den rätta smaken.
              </p>
           </div>
        </div>

        {/* Content Section */}
        <div className="row align-items-center mt-5 mb-5 pb-5">
           <div className="col-lg-6 mb-5 mb-lg-0">
               <div className="image-collage-wrapper">
                  <div className="collage-img-1 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" alt="Premium Steak" />
                  </div>
                  <div className="collage-img-2 shadow-lg">
                    <img src="https://impro.usercontent.one/appid/oneComWsb/domain/z-krog.se/media/z-krog.se/onewebmedia/20200528_184542.jpg?etag=%2222536d-5ed11a0c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=2500,1492&quality=85" alt="Gott mat" />
                  </div>
               </div>
           </div>
           
           <div className="col-lg-6 ps-lg-5">
               <h3 className="elite-section-title mb-4">Om Oss</h3>
               <p className="elite-text mb-4">
                 Z-krog har stolt funnits i Korsnäs / Falun i cirka 40 år. Ända sedan starten har vi passionerat 
                 serverat läckra maträtter bland annat À LA CARTE, PIZZA, PASTA, HAMBURGARE 
                 och gedigna KEBABRÄTTER till våra fantastiska gäster.
               </p>
               <p className="elite-text">
                 Vår hemlighet ligger i våra noggrant utvalda råvaror som alltid håller absolut 
                 högsta kvalitet, samt naturligtvis vår personals skickliga händer som ger varje 
                 måltid dess unika och genuina karaktär. Vi lägger oerhört stor tyngd vid att genom vår 
                 mat, våra drycker och vårt bemötande ge dig en äkta och minnesvärd toppenupplevelse!
               </p>
               <h4 className="about-welcome-elite mt-5">Hjärtligt välkomna!</h4>
           </div>
        </div>

      </div>
    </div>
  );
}