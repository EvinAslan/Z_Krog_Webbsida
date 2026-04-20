import { useState, useEffect, useRef } from 'react'

import PriceModal from '../components/PriceModal'
import CategoryCard from '../components/CategoryCard'
import { API } from '../utils/api'
const CART_KEY = 'guestCart'; // localStorage key

const topCategories = [
    { href: "pizza", img: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png", name: "Pizzor" },
    { href: "hamburgare", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", name: "Hamburgare" },
    { href: "kebabratter", img: "https://cdn-icons-png.flaticon.com/512/706/706893.png", name: "Kebabrätter" },
    { href: "alacarte", img: "https://cdn-icons-png.flaticon.com/512/11790/11790156.png", name: "À la carte" },
    { href: "rullar", img: "https://cdn-icons-png.flaticon.com/512/8616/8616731.png", name: "Rullar" },
    { href: "salad", img: "https://cdn-icons-png.flaticon.com/512/2515/2515183.png", name: "Salad" },
    { href: "husman", img: "https://cdn-icons-png.flaticon.com/512/3480/3480823.png", name: "Husman" },
    { href: "pastaratter", img: "https://cdn-icons-png.flaticon.com/512/4465/4465494.png", name: "Pastarätter" },
]

// --- localStorage helpers ---
const loadCart = () => {
    try {
        const saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch { return []; }
};

const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch { }
};

export default function Meny() {
    const [valdKategori, setValdKategori] = useState(() => {
        return sessionStorage.getItem('valdKategori') || "";
    });
    const [menuItem, setMenuItem] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cart, setCart] = useState(loadCart) // load saved cart immediately
    const [showModal, setShowModal] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        sessionStorage.setItem('valdKategori', valdKategori);
    }, [valdKategori]);

    // Save and restore scroll position on the menu page
    useEffect(() => {
        const handleScroll = () => {
            sessionStorage.setItem('menyScroll', window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    // Fetch menu on mount
    useEffect(() => {
        fetch(`${API}/products/menu`)
            .then(res => {
                if (!res.ok) throw new Error("Servern svarade med fel")
                return res.json()
            })
            .then(data => {
                setMenuItem(data)
                setLoading(false)

                // Återställ scrollposition exakt till elementet
                setTimeout(() => {
                    const lastCat = sessionStorage.getItem('lastViewedCategory');
                    if (lastCat) {
                        const el = document.getElementById(lastCat);
                        if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 100;
                            window.scrollTo({ top: y, behavior: 'instant' });
                            sessionStorage.removeItem('lastViewedCategory'); // Töm efter vi använt den
                            return;
                        }
                    }

                    // Fallback till scrollY om inget element fanns
                    const scrollY = sessionStorage.getItem('menyScroll');
                    if (scrollY) {
                        window.scrollTo({
                            top: parseInt(scrollY, 10),
                            behavior: "instant"
                        });
                    }
                }, 100);
            })
            .catch(err => {
                console.error("Fel vid hämtning:", err)
                setLoading(false)
                setError(err)
            })
    }, [])

    const openPriceSelection = (productName, prices, productId) => {
        setActiveProduct({ name: productName, prices, productId });
        setShowModal(true);
    };

    const addToCart = (productName, type, price, productId) => {
        setShowModal(false);

        setCart(prev => {

            const key = `${productId}-${type}`;
            const existing = prev.find(item => item.key === key);
            let updated;
            if (existing) {
                updated = prev.map(item =>
                    item.key === key ? { ...item, amount: item.amount + 1 } : item
                );
            } else {
                updated = [...prev, {
                    key,
                    id: productId,
                    name: `${productName} (${type})`,
                    price,
                    amount: 1
                }];
            }
            return updated;
        });

        showMessage('Tillagd i varukorgen!');
    };

    const removeFromCart = (key) => {
        setCart(prev => prev.filter(item => item.key !== key));
    };

    const showMessage = (msg) => {
        setCartMessage(msg);
        setTimeout(() => setCartMessage(''), 2500);
    };

    const section = useRef(null)
    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth",
        });
    };

    const itemIds = {};
    let idCounter = 1;
    Object.entries(menuItem).forEach(([catKey, category]) => {
        if (category[0] && category[0].toLowerCase() === "pizza") {
            Object.keys(category[2].itemlist).forEach(itemKey => {
                itemIds[`${catKey}-${itemKey}`] = idCounter++;
            });
        }
    });

    const idlist = {};
    let countingItems = 1;
    Object.entries(menuItem).forEach(([catKey, category]) => {
        if (category[0] && category[0].toLowerCase()) {
            Object.keys(category[2].itemlist).forEach(itemKey => {
                idlist[`${catKey}-${itemKey}`] = countingItems++;
            });
        }
    });



    return (
        <div className="menu-page">


            {cartMessage && (
                <div
                    className="position-fixed bottom-0 end-0 m-3 alert alert-success shadow"
                    style={{ zIndex: 9999, minWidth: '200px' }}
                >
                    {cartMessage}
                </div>
            )}

            <div className="container mt-4">
                <h1 className="menu-title">Vår meny</h1>
                <div className="row menu">
                    {topCategories.map((cat) => (
                        <div key={cat.href} className="col-md-4 col-sm-6 menu-item text-center">
                            <a className="menu-link" href="#section" onClick={(e) => { e.preventDefault(); setValdKategori(cat.href); scrollToSection(section) }}>
                                <img className="menu-icon" src={cat.img} alt={cat.name} />
                                <div className="menu-name">{cat.name}</div>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4 mb-5">
                    <div className="menu-all text-center" style={{ width: 'auto', padding: '0 2rem' }}>
                        <a className="menu-link" href="#section" onClick={(e) => { e.preventDefault(); setValdKategori(""); scrollToSection(section) }}>
                            <div className="menu-name" style={{ marginTop: 0, color: 'white' }}>Visa alla produkter</div>
                        </a>
                    </div>
                </div>

                {valdKategori && (
                    <p className='text' style={{ margin: '1rem 0' }}>
                        Filtrerar på: <strong>{valdKategori}</strong>
                    </p>
                )}

                <div id="MenuList" ref={section}>
                    {Object.entries(menuItem)
                        .filter(([catKey, c]) => valdKategori === "" || c[0].toLowerCase() === valdKategori.toLowerCase())
                        .map(([catKey, category], index) => (
                            <CategoryCard
                                key={index}
                                category={category}
                                catKey={catKey}
                                itemIds={itemIds}
                                idlist={idlist}
                                onAdd={openPriceSelection}
                            />
                        ))}
                </div>
            </div>

            {showModal && (
                <PriceModal
                    activeProduct={activeProduct}
                    onAdd={addToCart}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}
