import { useState, useEffect } from 'react';
import { API } from '../utils/api';

// Key for storing which products this user has already rated
const RATED_KEY = 'ratedProducts';

const getRatedProducts = () => {
    try {
        return JSON.parse(localStorage.getItem(RATED_KEY)) || {};
    } catch { return {}; }
};

const markAsRated = (productId) => {
    const rated = getRatedProducts();
    rated[productId] = true;
    localStorage.setItem(RATED_KEY, JSON.stringify(rated));
};

export default function ProductRating({ productId, initialRating, initialCount }) {
    const [rating, setRating] = useState(parseFloat(initialRating) || 0);
    const [count, setCount] = useState(parseInt(initialCount) || 0);
    const [hover, setHover] = useState(0);
    // Check on mount if user already rated this product
    const [hasRated, setHasRated] = useState(() => !!getRatedProducts()[productId]);
    const [thanks, setThanks] = useState(false);

    useEffect(() => {
        setRating(parseFloat(initialRating) || 0);
        setCount(parseInt(initialCount) || 0);
    }, [initialRating, initialCount]);

    // Update hasRated if productId changes (navigating between products)
    useEffect(() => {
        setHasRated(!!getRatedProducts()[productId]);
        setThanks(false);
    }, [productId]);

    const saveRating = async (val) => {
        if (hasRated) return; // Block if already rated

        const res = await fetch(`${API}/products/${productId}/rate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: val })
        });

        if (res.ok) {
            // Recalculate average immediately without a page reload
            setRating(prev => parseFloat(((prev * count + val) / (count + 1)).toFixed(2)));
            setCount(c => c + 1);
            markAsRated(productId); // Save to localStorage so they can't rate again
            setHasRated(true);
            setThanks(true); // Show inline thank you instead of alert
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                {[1, 2, 3, 4, 5].map((i) => {
                    const activeVal = (hasRated ? rating : (hover || rating));
                    let fill = 0;
                    if (activeVal >= i) fill = 100;
                    else if (activeVal > i - 1) fill = (activeVal - (i - 1)) * 100;

                    return (
                        <span
                            key={i}
                            onClick={() => saveRating(i)}
                            onMouseEnter={() => !hasRated && setHover(i)}
                            onMouseLeave={() => !hasRated && setHover(0)}
                            style={{
                                position: 'relative',
                                cursor: hasRated ? 'default' : 'pointer',
                                fontSize: '1.2rem',
                                color: '#ccc'
                            }}
                        >
                            <span>★</span>
                            <span style={{
                                position: 'absolute', top: 0, left: 0, width: `${fill}%`,
                                overflow: 'hidden', color: '#ffc107'
                            }}>★</span>
                        </span>
                    );
                })}
                <div className='rating'>
                    <span className="ms-2 small text-muted">({count})</span>
                    {thanks && (
                        <span className="ms-2 small text-success fw-bold">Tack för ditt betyg!</span>
                    )}
                    {hasRated && !thanks && (
                        <span className="ms-2 small text-muted fst-italic">Du har redan betygsatt</span>
                    )}
                </div>
            </div>
            
        </div>
    );
}
