// Base Import and client
import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing Imports
import { Routes, Route, HashRouter } from 'react-router-dom';

// Styling Import
import './index.css';

// Pages
import App from './App';
import Logout from './pages/Logout';
import SignupPage from './pages/SignupPage';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import Solstice from './pages/Solstice';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode is disabled for now, its primarily for debugging purposes.
  // <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route exact path="/" element={<App />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass/>} />
      <Route path="/solstice" element={<Solstice />} />
    </Routes>
  </HashRouter>
  // </React.StrictMode>
);
