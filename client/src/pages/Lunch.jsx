import { useEffect, useState } from "react";
import LunchDaySection from '../components/LunchDaySection';

const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

const defaultMenu = {
  Måndag: ["Pannbiff med kokt potatis, lingonsylt & gräddsås.", "Pasta carbonara."],
  Tisdag: ["Grillbiff med pommes & bearnaisesås.", "Stekt falukorv med stekt potatis & senapssås."],
  Onsdag: ["Helstekt fläskfilé med stekt potatis & pepparsås.", "Hemgjorda köttbullar med potatismos, lingonsylt & brunsås."],
  Torsdag: ["Stekt fläsk med kokt potatis, lingonsylt & löksås.", "Kycklingspett med pommes, tomatsås & tzatziki."],
  Fredag: ["Fläsknoisette med stekt potatis, rödvinssås & bearnaisesås.", "Flygande Jacob med ris."]
};

export default function Meny() {
  const [menu, setMenu] = useState(defaultMenu);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'true') {
      setIsAdmin(true);
      setEditMode(true);
    }

    try {
      const saved = localStorage.getItem("lunchMenu");
      if (saved) setMenu(JSON.parse(saved));
    } catch (e) {
      console.error("Could not load lunch menu:", e);
    }
  }, []);

  const handleDishChange = (day, idx, value) => {
    setMenu(prev => ({ ...prev, [day]: prev[day].map((d, i) => (i === idx ? value : d)) }));
  };

  const addDish = (day) => {
    setMenu(prev => ({ ...prev, [day]: [...prev[day], ""] }));
  };

  const removeDish = (day, idx) => {
    setMenu(prev => ({ ...prev, [day]: prev[day].filter((_, i) => i !== idx) }));
  };

  const saveMenu = () => {
    try {
      localStorage.setItem("lunchMenu", JSON.stringify(menu));
      setEditMode(false);
      alert("Lunchmenyn har sparats!");
    } catch (e) {
      alert("Det gick inte att spara.");
    }
  };

  const resetMenu = () => {
    if (!confirm("Vill du återställa till standardmenyn?")) return;
    setMenu(defaultMenu);
    localStorage.setItem("lunchMenu", JSON.stringify(defaultMenu));
  };

  return (
    <div className="lunch-page">
      <h1 className="lunch-title">Lunchmeny</h1>
      <p className="lunch-text">Vår lunchmeny serveras måndag till fredag mellan kl. 11:00 och 14:00.</p>

      {isAdmin && (
        <div className="mt-5 p-4 border-top bg-white shadow-sm rounded admin-Panel">
          <h5 className="mb-3">Administratörsverktyg</h5>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Visa som kund" : "Redigera rätter"}
            </button>
            {editMode && (
              <button className="btn btn-success" onClick={saveMenu}>Spara ändringar</button>
            )}
            <button className="btn btn-outline-warning" onClick={resetMenu}>Återställ standard</button>
            <button className="btn btn-dark ms-auto" onClick={() => window.location.href = '/admin'}>
              ← Tillbaka till Admin-panelen
            </button>
          </div>
        </div>
      )}

      <div className="lunch-list">
        {weekdays.map(day => (
          <LunchDaySection
            key={day}
            day={day}
            menu={menu}
            editMode={editMode}
            isAdmin={isAdmin}
            onDishChange={handleDishChange}
            onAddDish={addDish}
            onRemoveDish={removeDish}
          />
        ))}
      </div>
    </div>
  );
}
