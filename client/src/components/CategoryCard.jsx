import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';

export default function CategoryCard({ category, catKey, itemIds, idlist, onAdd }) {
    const [urlName, title, { price1, price2, price3,price4, imageClass, itemlist }] = category;

    return (
        <div className='pizza-category'>
            <div className="pizza-header">
                <h4 className="pizza-title">{title}</h4>
                <div className="pizza-prices col-md-4">
                    {price1 > 0 && <span>Barn {price1}:-</span>}
                    {price2 > 0 && <span>Standart {price2}:-</span>}
                    {price3 > 0 && <span>Familj {price3}:-</span>}
                    {price4 > 0 && <span>Glutenfri {price4}:-</span>}
                </div>
            </div>

            <div className="row align-items-center g-4">
                <div className="col-md-4 text-center">
                    <img src={imageClass} alt={title} className="img" />
                </div>
                <div className="col-md-8">
                    <ol className="pizza-list">
                        {Object.entries(itemlist).map(([itemKey, itemData]) => {
                            const [namn, beskrivning, id, avgRating, revCount, customP1, customP2, customP3, customP4] = itemData;
                            // id is the real database product id, needed for cart

                            const productPrices = {
                                p1: customP1 > 0 ? customP1 : price1,
                                p2: customP2 > 0 ? customP2 : price2,
                                p3: customP3 > 0 ? customP3 : price3,
                                p4: customP4 > 0 ? customP4 : price4
                            };
                            const ProductPricesMessege = {
                                p1Message: "Barn:" + productPrices.p1 + ":-",
                                p2Message: "Standard:" + productPrices.p2 + ":-",
                                p3Message: "Familj:" + productPrices.p3 + ":-",
                                p4Message: "Glutenfri:" + productPrices.p4 + ":-",
                            };

                            return (
                                <li key={itemKey} className="Pizza-discription mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='d-flex flex-column align-items-start productDetail-contaner'>
                                            
                                                <div style={{ flex: 1 }}>
                                                    <strong>
                                                        {itemIds[`${catKey}-${itemKey}`]
                                                            ? `${itemIds[`${catKey}-${itemKey}`]}. `
                                                            : ""}
                                                        {namn}
                                                        
                                                    </strong>
                                                    <div className="productDetail">
                                                        <Link to={`/product/${idlist[`${catKey}-${itemKey}`]}`} className="badge bg-light border text-decoration-none">Mer om produkten</Link>
                                                    </div>
                                                </div>
                                                
                                            
                                            <div>
                                                <ProductRating productId={id} initialRating={avgRating} initialCount={revCount} />
                                            </div>
                                            <div className='priceing-Invidual'>
                                                {(customP1 > 0) && (
                                                    <div className="small mt-1">
                                                        <span className="badge bg-light text-dark border">
                                                            {ProductPricesMessege.p1Message}
                                                        </span>
                                                    </div>
                                                )}
                                                {(customP2 > 0) && (
                                                    <div className="small mt-1">
                                                        <span className="badge bg-light text-dark border">
                                                            {ProductPricesMessege.p2Message}
                                                        </span>
                                                    </div>
                                                )}
                                                {(customP3 > 0) && (
                                                    <div className="small mt-1">
                                                        <span className="badge bg-light text-dark border">
                                                            {ProductPricesMessege.p3Message}
                                                        </span>
                                                    </div>
                                                )}
                                                {(customP4 > 0) && (
                                                    <div className="small mt-1">
                                                        <span className="badge bg-light text-dark border">
                                                            {ProductPricesMessege.p4Message}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-success ms-3" onClick={() => onAdd(namn, productPrices, id)}>
                                                + Lägg till
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol> 
                </div>
            </div>
        </div>
    );
}