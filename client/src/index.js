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
import EmailVerificationSent from './pages/EmailVerificationSent';
import EmailVerified from './pages/EmailVerified';
import EmailNotVerified from './pages/EmailNotVerified';
import ForgotPass from './pages/ForgotPass';
import ForgotPassSuccess from './pages/ForgotPassSuccess';
import ResetPass from './pages/ResetPass';
import PasswordResetSuccess from './pages/PasswordResetSuccess';
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
      <Route path="/email-verification-sent" element={<EmailVerificationSent />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/email-not-verified" element={<EmailNotVerified />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/forgot-password-success" element={<ForgotPassSuccess />} />
      <Route path="/reset-password" element={<ResetPass/>} />
      <Route path="/reset-password-success" element={<PasswordResetSuccess />} />
      <Route path="/solstice" element={<Solstice />} />
    </Routes>
  </HashRouter>
  // </React.StrictMode>
);
