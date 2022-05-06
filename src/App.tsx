import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Navbar />
      </div>
      <div className='content'>
        <Content />
      </div>
    </div>
  );
}

export default App;
