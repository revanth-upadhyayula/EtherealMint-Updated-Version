import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Main_content from './components/Main_content';
import Down_content from './components/Down_content';
import Ethereum from './components/Ethereum';
import Features from './components/Features';
import About from './components/About';
import FAQ from './components/FAQ';
import Site_work from './components/Site_work';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where we want to hide Navigation and show Back Button
  const hideNavPages = ["/ethereum", "/about", "/faq"];
  console.log(location.pathname)
  console.log(hideNavPages.includes(location.pathname));

  return (
    <div>
      {/* Conditionally render Navigation or Back button */}
      {hideNavPages.includes(location.pathname) ? (
        <button onClick={() => navigate(-1)} className="back-button"> Back</button>
      ) : (
        <Navigation />
      )}

      <Routes>
        <Route path="/ethereum" element={
          <>
            <Ethereum />
            <Features />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={
          <>
            <Main_content />
            <Down_content />
            <Site_work />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
