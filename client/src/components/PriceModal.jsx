export default function PriceModal({ activeProduct, onAdd, onClose }) {
    if (!activeProduct) return null;

    return (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Välj storlek: {activeProduct.name}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-grid gap-2">
                            {activeProduct.prices.p1 > 0 && (
                                <button className="btn btn-outline-dark" onClick={() => onAdd(activeProduct.name, "Barn", activeProduct.prices.p1, activeProduct.productId)}>
                                    Barn ({activeProduct.prices.p1}:-)
                                </button>
                            )}
                            {activeProduct.prices.p2 > 0 && (
                                <button className="btn btn-outline-dark" onClick={() => onAdd(activeProduct.name, "Standard", activeProduct.prices.p2, activeProduct.productId)}>
                                    Standard ({activeProduct.prices.p2}:-)
                                </button>
                            )}
                            {activeProduct.prices.p3 > 0 && (
                                <button className="btn btn-outline-dark" onClick={() => onAdd(activeProduct.name, "Familj", activeProduct.prices.p3, activeProduct.productId)}>
                                    Familjepizza ({activeProduct.prices.p3}:-)
                                </button>
                            )}
                             {activeProduct.prices.p4 > 0 && (
                                <button className="btn btn-outline-dark" onClick={() => onAdd(activeProduct.name, "Glutenfri", activeProduct.prices.p4, activeProduct.productId)}>
                                    Glutenfri ({activeProduct.prices.p4}:-)
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
