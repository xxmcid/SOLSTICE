// Base Import and client
import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Styling Import
import './index.css';

// Pages
import App from './App';
import SignupPage from './pages/SignupPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode is disabled for now, its primarily for debugging purposes.
  // <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);
