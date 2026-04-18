import React, { useState, useEffect } from 'react';
import { API } from '../utils/api';
import CategoryModal from '../components/CategoryModal';
import ProductModal from '../components/ProductModal';

const Admin = () => {
  const [menuData, setMenuData] = useState({});
  const [rawProducts, setRawProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [editTarget, setEditTarget] = useState(null);

  const [catForm, setCatForm] = useState({ name: '', title: '', p1: 0, p2: 0, p3: 0, p4: 0, img: '' });
  const [prodForm, setProdForm] = useState({
    selectedName: '', selectedTitle: '', title: '', desc: '',
    cp1: 0, cp2: 0, cp3: 0, cp4: 0, cImg: ''
  });

  const API_URL = `${API}/products`;

  const fetchData = async () => {
    try {
      const [menuRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/menu`),
        fetch(API_URL)
      ]);
      setMenuData(await menuRes.json());
      setRawProducts(await prodRes.json());
    } catch (err) {
      console.error("Fel vid hämtning:", err);
      setMessage("Kunde inte hämta menydata.");
    }
  };


  useEffect(() => { 
    if(localStorage.getItem('adminToken') !== 'pizzakung123') {
      window.location.href = '/singIn'; // Sparka ut obehöriga
    } else {
      fetchData(); 
    }
  }, []);

  

  const handleEditCategory = (catName, catTitle) => {
    const catInfo = rawProducts.find(p => p.title === "Kategori Info" && p.category === catTitle);
    if (catInfo) {
      setEditTarget(catInfo);
      setCatForm({
        name: catName,
        title: catTitle,
        p1: catInfo.price1,
        p2: catInfo.price2,
        p3: catInfo.price3,
        p4: catInfo.price4,
        img: catInfo.image_url
      });
      new window.bootstrap.Modal(document.getElementById('catModal')).show();
    }
  };

  const handleSave = async (type, data) => {
    const isUpdate = !!editTarget;
    const url = isUpdate ? `${API_URL}/${editTarget.id}` : API_URL;
    const method = isUpdate ? 'PUT' : 'POST';
    

    let payload = {};

    if (type === 'category') {
      payload = {
        category: data.title,
        title: "Kategori Info",
        description: data.name,
        price1: Number(data.p1) || 0,
        price2: Number(data.p2) || 0,
        price3: Number(data.p3) || 0,
        price4: Number(data.p4) || 0,
        image_url: data.img
      };
    } else {
      const catPrices = getPricesFromCat(data.selectedName, data.selectedTitle);
      payload = {
        category: data.selectedTitle,
        title: data.title,
        description: data.desc,
        custom_price1: Number(data.cp1) || 0,
        custom_price2: Number(data.cp2) || 0,
        custom_price3: Number(data.cp3) || 0,
        custom_price4: Number(data.cp4) || 0,
        image_url: catPrices.image_url,
        custom_image_pruduct: data.cImg
      };
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('adminToken')},
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage('Sparat!');
        closeModals();
        fetchData();
      }
    } catch (err) {
      setMessage('Ett fel uppstod vid sparning.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Radera produkt?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' },{headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('adminToken')},});
      if (res.ok) fetchData();
    } catch (err) { setMessage('Kunde inte radera.'); }
  };

  const handleDeleteCategory = async (catName, catTitle) => {
    const productsToDelete = rawProducts.filter(p => p.category === catTitle);
    if (window.confirm(`Radera hela prisklassen "${catTitle}"?`)) {
      await Promise.all(productsToDelete.map(p => fetch(`${API_URL}/${p.id}`, { method: 'DELETE' })));
      fetchData();
    }
  };

  const closeModals = () => {
    setEditTarget(null);
    setCatForm({ name: '', title: '', p1: 0, p2: 0, p3: 0,p4:0, img: '' });
    setProdForm({ selectedName: '', selectedTitle: '', title: '', desc: '', cp1: 0, cp2: 0, cp3: 0,cp4:0, cImg: '' });
    document.querySelectorAll('.modal').forEach(el => {
      const m = window.bootstrap.Modal.getInstance(el);
      if (m) m.hide();
    });
  };

  const getPricesFromCat = (name, title) => {
    const cat = Object.values(menuData).find(c => c[0] === name && c[1] === title);
    return cat ? {
      price1: cat[2].price1,
      price2: cat[2].price2,
      price3: cat[2].price3,
      price4: cat[2].price4,
      image_url: cat[2].imageClass,
      cprice1: cat[2].cp1,
      cprice2: cat[2].cp2,
      cprice3: cat[2].cp3,
      cprice4: cat[2].cp4,
      cImg: cat[2].cImg
    } : {
      price1: 0, price2: 0, price3: 0, price4: 0, image_url: '',
      cprice1: 0, cprice2: 0, cprice3: 0, cprice4: 0, cImg: ''
    };
  };

  const uniqueNames = [...new Set(Object.values(menuData).map(v => v[0]))];
  const filteredTitles = Object.values(menuData)
    .filter(v => v[0] === prodForm.selectedName)
    .map(v => v[1]);

  return (
    <div className="admin-page container mt-5 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Meny Administration</h2>
        <div>
          <button className="btn-redigera btn-outline-success me-2" onClick={() => window.location.href = '/lunch?edit=true'}>Redigera Lunchmeny</button>
          <button className="btn-nypriss btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#catModal" onClick={() => setEditTarget(null)}>+ Ny Prisklass</button>
          <button className="btn-nyprodukt btn-primary" data-bs-toggle="modal" data-bs-target="#prodModal" onClick={() => setEditTarget(null)}>+ Ny Produkt</button>
        </div>
      </div>

      <div className="row">
        {Object.entries(menuData).map(([id, val]) => (
          <div key={id} className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom-0 pt-3">
                <div>
                  <h5 className="mb-0 fw-bold">{val[1]}</h5>
                  <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>
                    Filter: <strong>{val[0]}</strong> | {val[2].price1}:- / {val[2].price2}:- / {val[2].price3}:- / {val[2].price4}:- 
                  </small>
                </div>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditCategory(val[0], val[1])}>Ändra</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCategory(val[0], val[1])}>Radera</button>
                </div>
              </div>
              <ul className="list-group list-group-flush p-2">
                {Object.entries(val[2].itemlist).map(([itemKey, item]) => {
                  if (item[0] === "Kategori Info") return null;

                  const realProd = rawProducts.find(p =>
                    p.title?.trim().toLowerCase() === item[0]?.trim().toLowerCase() &&
                    p.category?.trim().toLowerCase() === val[1]?.trim().toLowerCase()
                  );
                  if (!realProd) return null;

                  return (
                    <li key={itemKey} className="list-group-item d-flex justify-content-between align-items-center border-0 rounded mb-1 bg-white shadow-sm">
                      <div>
                        <div className="fw-bold">{item[0]}</div>
                        <div className="small text-muted">{item[1]}</div>
                        {(realProd.custom_price1 > 0 || realProd.custom_price2 > 0 ||  realProd.custom_price3 > 0 || realProd.custom_price4 > 0) && (
                          <div className="small text-success fw-bold">
                            Individuellt pris: {realProd.custom_price1}:- / {realProd.custom_price2}:- / {realProd.custom_price3}:- / {realProd.custom_price4}:-
                          </div>
                        )}
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-sm text-primary me-1" onClick={() => {
                          setEditTarget(realProd);
                          setProdForm({
                            selectedName: val[0],
                            selectedTitle: realProd.category,
                            title: realProd.title,
                            desc: realProd.description,
                            cp1: realProd.custom_price1,
                            cp2: realProd.custom_price2,
                            cp3: realProd.custom_price3,
                            cp4: realProd.custom_price4,
                            cImg: realProd.custom_image_pruduct || ''
                          });
                          new window.bootstrap.Modal(document.getElementById('prodModal')).show();
                        }}>Redigera</button>
                        <button className="btn btn-sm btn-danger rounded-circle" onClick={() => handleDelete(realProd.id)}>&times;</button>
                      </div> 
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <CategoryModal
        editTarget={editTarget}
        catForm={catForm}
        setCatForm={setCatForm}
        onClose={closeModals}
        onSave={handleSave}
      />

      <ProductModal
        editTarget={editTarget}
        prodForm={prodForm}
        setProdForm={setProdForm}
        onClose={closeModals}
        onSave={handleSave}
        uniqueNames={uniqueNames}
        filteredTitles={filteredTitles}
      />
    </div>
  );
};

export default Admin;
