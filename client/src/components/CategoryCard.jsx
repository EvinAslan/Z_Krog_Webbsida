import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';

export default function CategoryCard({ category, catKey, itemIds, idlist, onAdd }) {
    const [urlName, title, { price1, price2, price3, price4, imageClass, itemlist }] = category;

    return (
        <div id={`category-${catKey}`} className='pizza-category-container mb-5'>
            <div className="d-flex align-items-center mb-4">
                <h3 className="fw-bold m-0" style={{ color: 'var(--primary)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {title} {urlName && urlName.toLowerCase() === 'pizza' ? '🍕' : ''}
                </h3>
            </div>

            <div className="row g-4">
                {Object.entries(itemlist).map(([itemKey, itemData]) => {
                    const [namn, beskrivning, id, avgRating, revCount, customP1, customP2, customP3, customP4] = itemData;

                    const p1 = customP1 > 0 ? customP1 : price1;
                    const p2 = customP2 > 0 ? customP2 : price2;
                    const p3 = customP3 > 0 ? customP3 : price3;
                    const p4 = customP4 > 0 ? customP4 : price4;

                    const productPrices = {
                        p1, p2, p3, p4
                    };

                    const validPrices = [p1, p2, p3, p4].filter(p => p > 0);
                    const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

                    return (
                        <div key={itemKey} className="col-lg-6 col-md-12">
                            <div className="product-grid-card h-100 d-flex bg-white rounded-3 shadow-sm position-relative" style={{ minHeight: '140px', padding: '15px', border: '1px solid #eaeaea', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }}>

                                {/* Bild till vänster */}
                                <div className="me-3 d-flex align-items-center justify-content-center" style={{ flexShrink: 0 }}>
                                    <img src={imageClass} alt={namn} style={{ width: '120px', height: '120px', objectFit: 'contain', borderRadius: '50%', backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }} />
                                </div>

                                {/* Information till höger */}
                                <div className="d-flex flex-column justify-content-between flex-grow-1 py-1">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h5 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.05rem', letterSpacing: '0.2px' }}>
                                                {itemIds[`${catKey}-${itemKey}`] ? `${itemIds[`${catKey}-${itemKey}`]}. ` : ""}{namn.toUpperCase()}
                                            </h5>
                                            <Link
                                                to={`/product/${idlist[`${catKey}-${itemKey}`]}`}
                                                className="text-decoration-none ms-2"
                                                title="Mer om produkten"
                                                onClick={() => sessionStorage.setItem('lastViewedCategory', `category-${catKey}`)}
                                            >
                                                <i className="fa-solid fa-circle-info fs-5" style={{ color: '#e5ad3b' }}></i>
                                            </Link>
                                        </div>

                                        {beskrivning && (
                                            <p className="small mb-2" style={{ lineHeight: '1.4', color: '#666' }}>
                                                {beskrivning}
                                            </p>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-end mt-2">
                                        <div className="fw-bold text-dark" style={{ fontSize: '1.05rem' }}>
                                            {lowestPrice > 0 ? `Från ${lowestPrice} kr` : ""}
                                        </div>
                                        <button
                                            className="btn btn-sm btn-outline-success rounded-circle d-flex align-items-center justify-content-center p-0"
                                            style={{ width: '32px', height: '32px', borderWidth: '1.5px', borderColor: '#4cae4c', color: '#4cae4c' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onAdd(namn, productPrices, id);
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4cae4c'; e.currentTarget.style.color = 'white'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4cae4c'; }}
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}