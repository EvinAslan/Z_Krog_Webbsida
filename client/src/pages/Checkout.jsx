import { useState, useEffect } from 'react';
import OrderSummary from '../components/OrderSummary';
 
export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
 
    useEffect(() => {
        // Hämtar listan som Meny.jsx har sparat
        const savedCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartItems(savedCart);
    }, []);
 
    const totalSum = cartItems.reduce((sum, item) => sum + (item.price * item.amount), 0);
  
    if (cartItems.length === 0) {
        return <div className="container mt-5"><h4>Din varukorg är tom.</h4></div>;
    }
 
    return (
        <div className="menu-page" style={{ minHeight: '80vh' }}>
            <div className='container mt-5 mb-5 d-flex justify-content-center'>
                <div className="col-md-8 col-lg-6">
                    <h2 className="text-center mb-4" style={{ color: 'var(--primary)', fontWeight: '800' }}>Din Varukorg</h2>
                    <OrderSummary cartItems={cartItems} totalSum={totalSum} />
                </div>
            </div>
        </div>
    );
}
