// Base Import and client
import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing Imports
import { Routes, Route, HashRouter } from 'react-router-dom';

// Styling Import
import './index.css';

// Pages
import App from './App';
import SignupPage from './pages/SignupPage';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import Solstice from './pages/Solstice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode is disabled for now, its primarily for debugging purposes.
  // <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />
      <Route path="/resetpassword" element={<ResetPass/>} />
      <Route path="/solstice" element={<Solstice />} />
    </Routes>
  </HashRouter>
  // </React.StrictMode>
);
