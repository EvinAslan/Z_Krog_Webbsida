export default function ProductModal({ editTarget, prodForm, setProdForm, onClose, onSave, uniqueNames, filteredTitles }) {
    return (
        <div className="modal fade" id="prodModal" tabIndex="-1" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">{editTarget ? 'Redigera Produkt' : 'Ny Produkt'}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={onClose}></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); onSave('product', prodForm); }}>
                        <div className="modal-body p-4">
                            <label className="small fw-bold">Huvudkategori</label>
                            <select
                                className="form-select mb-3"
                                value={prodForm.selectedName}
                                onChange={e => setProdForm({ ...prodForm, selectedName: e.target.value, selectedTitle: '' })}
                                required
                            >
                                <option value="">-- Välj --</option>
                                {uniqueNames.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>

                            <label className="small fw-bold">Prisklass</label>
                            <select
                                className="form-select mb-3"
                                value={prodForm.selectedTitle}
                                onChange={e => setProdForm({ ...prodForm, selectedTitle: e.target.value })}
                                disabled={!prodForm.selectedName}
                                required
                            >
                                <option value="">-- Välj --</option>
                                {filteredTitles.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>

                            <label className="small fw-bold mt-2">Individuella priser (lämna 0 för att använda kategorins pris)</label>
                            <div className="row g-2 mb-3">
                                <div className="col">
                                    <small>Barn</small>
                                    <input type="number" className="form-control" value={prodForm.cp1} onChange={e => setProdForm({ ...prodForm, cp1: e.target.value })} />
                                </div>
                                <div className="col">
                                    <small>Standard</small>
                                    <input type="number" className="form-control" value={prodForm.cp2} onChange={e => setProdForm({ ...prodForm, cp2: e.target.value })} />
                                </div>
                                <div className="col">
                                    <small>Familj</small>
                                    <input type="number" className="form-control" value={prodForm.cp3} onChange={e => setProdForm({ ...prodForm, cp3: e.target.value })} />
                                </div>
                                <div className="col">
                                    <small>Glutenfri</small>
                                    <input type="number" className="form-control" value={prodForm.cp4} onChange={e => setProdForm({ ...prodForm, cp4: e.target.value })} />
                                </div>
                            </div>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Namn"
                                value={prodForm.title}
                                onChange={e => setProdForm({ ...prodForm, title: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Inviduell bild-URL här..."
                                value={prodForm.cImg || ''}
                                onChange={e => setProdForm({ ...prodForm, cImg: e.target.value })}
                            />
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Beskrivning"
                                value={prodForm.desc}
                                onChange={e => setProdForm({ ...prodForm, desc: e.target.value })}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Avbryt</button>
                            <button type="submit" className="btn btn-primary">Spara</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
