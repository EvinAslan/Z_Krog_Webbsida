export default function OrderSummary({ cartItems, totalSum }) {
    return (
        <div className="card p-4 bg-white shadow-sm border-0">
            <h5 className="mb-4">Din beställning</h5>
            <ul className="list-group list-group-flush">
                {cartItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
                        <div>
                            <span className="fw-bold">{item.amount}x</span> {item.name}
                        </div>
                        <span className="text-muted">{item.price * item.amount} kr</span>
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