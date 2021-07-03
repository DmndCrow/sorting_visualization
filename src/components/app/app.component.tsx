import React from 'react';
import './app.component.css';
import Header from '../header/header.component';
import {Visualization} from '../visualization';

function App() {
  const length = 20;

  return (
    <div>
      <Header />
      <Visualization length={length}/>
    </div>
  );
}

export default App;
