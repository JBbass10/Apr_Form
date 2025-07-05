
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AprForm from './components/AprForm';
import './style.css';
import './style-dark.css';
import './style-form-section.css';
import './style-final.css';
import './style-completo.css';


function Home() {
  return (
    <div>
      <h2>Bem-vindo ao Sistema de APR - Escola de Eletricista.</h2>
      <p>Use o menu para navegar.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Início</Link> |{' '}
        <Link to="/nova-apr">Nova APR</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova-apr" element={<AprForm />} />
      </Routes>
    </div>
  );
}

export default App;
