export default function LunchDaySection({ day, menu, editMode, isAdmin, onDishChange, onAddDish, onRemoveDish }) {
    return (
        <section className="mb-4">
            <h3 style={{ color: "#0b57a4" }}>{day}.</h3>
            {editMode && isAdmin ? (
                <div className="p-3 border rounded bg-light">
                    {menu[day].map((dish, idx) => (
                        <div key={idx} className="d-flex gap-2 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={dish}
                                onChange={e => onDishChange(day, idx, e.target.value)}
                            />
                            <button className="btn btn-outline-danger btn-sm" onClick={() => onRemoveDish(day, idx)}>
                                Ta bort
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onAddDish(day)}>
                        + Lägg till rätt
                    </button>
                </div>
            ) : (
                <ul className="list-unstyled ms-3">
                    {menu[day].map((dish, idx) => (
                        <li key={idx} className="mb-1">• {dish}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}
