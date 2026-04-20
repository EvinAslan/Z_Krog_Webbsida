export default function OrderSummary({ cartItems, totalSum, onRemoveItem, onUpdateAmount }) {
    return (
        <div className="card p-4 bg-white shadow-sm border-0">
            <h5 className="mb-4">Din beställning</h5>
            <ul className="list-group list-group-flush">
                {cartItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
                        <div className="d-flex align-items-center">
                            <button 
                                className="btn btn-sm btn-outline-danger me-3" 
                                onClick={() => onRemoveItem(index)}
                                title="Ta bort från varukorg"
                                style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <i className="fa-solid fa-trash fs-6"></i>
                            </button>
                            <div className="d-flex flex-column">
                                <span className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{item.name}</span>
                                <div className="d-flex align-items-center gap-2">
                                    <button 
                                        className="btn btn-sm btn-outline-secondary" 
                                        style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }} 
                                        onClick={() => onUpdateAmount(index, -1)} 
                                        disabled={item.amount <= 1}>
                                            <i className="fa-solid fa-minus" style={{ fontSize: '10px' }}></i>
                                    </button>
                                    <span className="fw-bold text-center" style={{ minWidth: '16px', fontSize: '0.95rem' }}>{item.amount}</span>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary" 
                                        style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }} 
                                        onClick={() => onUpdateAmount(index, 1)}>
                                            <i className="fa-solid fa-plus" style={{ fontSize: '10px' }}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="text-muted text-end ms-2" style={{ minWidth: '60px' }}>{item.price * item.amount} kr</span>
                    </li>
                ))}
            </ul>
 
            <div className="mt-4 p-3 bg-light rounded">
                <div className="d-flex justify-content-between align-items-center fw-bold fs-5">
                    <span>Totalt att betala:</span>
                    <span className="text-success">{totalSum} kr</span>
                </div>
                <small className="text-muted">Inklusive moms och serviceavgift</small>
            </div>
        </div>
    );
}