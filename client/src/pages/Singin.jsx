import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importera useNavigate

export default function Singin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Initiera navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@zkrog.se' && password === 'admin123') {
      localStorage.setItem('adminToken', 'pizzakung123'); // Sparar inloggningen
      navigate('/admin');
    } else {
      alert("Fel e-post eller lösenord!");
    }
  };

  return (
    <div className='singIn-Contaner'>
      <div className="form-signin w-100 m-auto" style={{ maxWidth: '330px', padding: '15px' }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Logga in (Admin)</h1>

          <div className="form-floating mb-2">
            <input 
              type="email" 
              className="form-control" 
              id="floatingInput" 
              placeholder="namn@exempel.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">E-postadress</label>
          </div>

          <div className="form-floating mb-3">
            <input 
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Lösenord</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Logga in
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2026 Grupp 22</p>
        </form>
      </div>
    </div>
  );
}