export default function CategoryModal({ editTarget, catForm, setCatForm, onClose, onSave }) {
    return (
        <div className="modal fade" id="catModal" tabIndex="-1" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">{editTarget ? 'Ändra Prisklass' : 'Ny Prisklass'}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={onClose}></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); onSave('category', catForm); }}>
                        <div className="modal-body p-4">
                            <label className="small fw-bold">Huvudkategori (Sökfilter)</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={catForm.name}
                                onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                                required
                            />
                            <label className="small fw-bold">Display-titel (Prisklassens namn)</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={catForm.title}
                                onChange={e => setCatForm({ ...catForm, title: e.target.value })}
                                required
                            />
                            <label className="small fw-bold">Priser (kr)</label>
                            <div className="row g-2 mb-3">
                                <div className="col">
                                    <small>Barn</small>
                                    <input type="number" className="form-control" value={catForm.p1} onChange={e => setCatForm({ ...catForm, p1: e.target.value })} required />
                                </div> 
                                <div className="col">
                                    <small>Standart</small>
                                    <input type="number" className="form-control" value={catForm.p2} onChange={e => setCatForm({ ...catForm, p2: e.target.value })} />
                                </div>
                                <div className="col">
                                    <small>Familj</small>
                                    <input type="number" className="form-control" value={catForm.p3} onChange={e => setCatForm({ ...catForm, p3: e.target.value })} />
                                </div>
                                <div className="col">
                                    <small>Glutenfri</small>
                                    <input type="number" className="form-control" value={catForm.p4} onChange={e => setCatForm({ ...catForm, p4: e.target.value })} />
                                </div>
                            </div>
                            <label className="small fw-bold">Bild-URL</label>
                            <input
                                type="text"
                                className="form-control"
                                value={catForm.img}
                                onChange={e => setCatForm({ ...catForm, img: e.target.value })}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Avbryt</button>
                            <button type="submit" className="btn btn-dark">Spara</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}