import React, {useState} from 'react';
import './app.component.css';
import {Visualization} from '../visualization';
import {Header} from '../header';

function App() {
  const [length, setLength] = useState(100);
  const [algorithm, setAlgorithm] = useState('bubble-sort');

  return (
    <div>
      <Header length={length}
              setLength={setLength}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
      />
      <Visualization length={length}/>
    </div>
  );
}

export default App;
