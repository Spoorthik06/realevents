import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './src/components/pages/LandingPage';
import { LoginPage } from './src/components/pages/LoginPage';
import { SignupPage } from './src/components/pages/SignupPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
