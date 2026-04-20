import { useState, useEffect } from 'react';
import OrderSummary from '../components/OrderSummary';
 
export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
 
    useEffect(() => {
        // Hämtar listan som Meny.jsx har sparat
        const savedCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartItems(savedCart);
    }, []);

    const handleRemoveItem = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage')); // Update navbar counter
    };

    const handleUpdateAmount = (indexToUpdate, change) => {
        const updatedCart = [...cartItems];
        const newAmount = updatedCart[indexToUpdate].amount + change;
        if (newAmount > 0) {
            updatedCart[indexToUpdate].amount = newAmount;
            setCartItems(updatedCart);
            localStorage.setItem('guestCart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('storage')); // Update navbar counter
        }
    };
 
    const totalSum = cartItems.reduce((sum, item) => sum + (item.price * item.amount), 0);
  
    if (cartItems.length === 0) {
        return (
            <div className="menu-page" style={{ minHeight: '80vh' }}>
                <div className="container mt-5 text-center">
                    <h4 className="text-white mt-5">Din varukorg är tom.</h4>
                </div>
            </div>
        );
    }
 
    return (
        <div className="menu-page" style={{ minHeight: '80vh' }}>
            <div className='container mt-5 mb-5 d-flex justify-content-center'>
                <div className="col-md-8 col-lg-6">
                    <h2 className="text-center mb-4" style={{ color: 'var(--primary)', fontWeight: '800' }}>Din Varukorg</h2>
                    <OrderSummary 
                        cartItems={cartItems} 
                        totalSum={totalSum} 
                        onRemoveItem={handleRemoveItem} 
                        onUpdateAmount={handleUpdateAmount} 
                    />
                </div>
            </div>
        </div>
    );
}
