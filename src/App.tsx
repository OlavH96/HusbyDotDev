import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Content/Content';
import PlanetsCanvas from './P5/PlanetsCanvas';
import Css from './CSS/Css';
import Combined from './P5/Combined';

function App() {
  return (
    <div className="App">
      <div className='nav'>
          <a href='/'>Home</a>
          <a href='/planets'>Planets</a>
          <a href='/css'>CSS</a>
      </div>
      <div className="content">

      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/planets' element={<Combined/>} />
        <Route path='/css' element={<Css/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
