import React from 'react';
import './app.component.css';
import Header from '../header/header.component';
import Visualization from '../visualization/visualization.component';

function App() {
  const length = 40;

  return (
    <div>
      <Header />
      <Visualization length={length}/>
    </div>
  );
}

export default App;
