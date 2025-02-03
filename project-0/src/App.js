import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import About from './components/About';
import FAQ from './components/FAQ';
import Main_content from './components/Main_content';
import Down_content from './components/Down_content';
import Features from './components/Features';
import Site_work from './components/Site_work';
import { Route,Routes } from 'react-router-dom';
const App = () => {


  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<>
          <Main_content /> {/* Render only on the home page */}
          <Down_content /> {/* Render only on the home page */}
          <Features /> {/* Render only on the home page */}
          <Site_work /> {/* Render only on the home page */}
        </>} />
      </Routes>
    </div>
  );
};

export default App;
