import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';

// Lazy-loaded components
const Main_content = lazy(() => import('./components/Main_content'));
const Down_content = lazy(() => import('./components/Down_content'));
const Ethereum = lazy(() => import('./components/Ethereum'));
const Features = lazy(() => import('./components/Features'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Site_work = lazy(() => import('./components/Site_work'));
const Mint = lazy(() => import('./components/Mint'));
const Credits = lazy(() => import('./components/Credits'));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where we want to hide Navigation and show Back Button
  const hideNavPages = ["/ethereum", "/about", "/faq", "/mint"];

  return (
    <div>
      {/* Conditionally render Navigation or Back button */}
      {hideNavPages.includes(location.pathname) ? (
        <button onClick={() => navigate(-1)} className="back-button"> Back</button>
      ) : (
        <Navigation />
      )}

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/ethereum" element={
            <>
              <Ethereum />
              <Features />
            </>
          } />
          <Route path="/mint" element={<Mint />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={
            <>
              <Main_content />
              <Down_content />
              <Site_work />
              <Credits />
            </>
          } />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
