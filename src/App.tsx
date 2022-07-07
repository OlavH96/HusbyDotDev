import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import PlanetsCanvas from './P5/PlanetsCanvas';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Navbar />
      </div>
      <div className='content'>
        {/* <Content /> */}
        <PlanetsCanvas/>
      </div>
    </div>
  );
}

export default App;
