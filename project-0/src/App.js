import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Main_content from './components/Main_content';
import Down_content from './components/Down_content';
import Features from './components/Features';
import Site_work from './components/Site_work';
const App = () => {
  

  return (
    <div>
      <Navigation />
      <Main_content />
      <Down_content />
      <Features />
      <Site_work />
    </div>
  );
};

export default App;
