import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css'; // Include grid background styling here
import BuilderApp from './BuilderApp';

const Hall = () => {
  return (
    <div className="draggable-box" style={{ width: '200px', height: '200px', background: 'lightgreen', position: 'absolute' }}>
      Hall (200x200)
    </div>
  );
};

const Store = () => {
  return (
    <div className="draggable-box" style={{ width: '100px', height: '100px', background: 'lightblue', position: 'absolute' }}>
      Store (20x20)
    </div>
  );
};

function App() {
  const [positions, setPositions] = useState({
    hall: { x: 0, y: 0 },
    store: { x: 300, y: 0 }
  });

  const handleDrag = (e, data, key) => {
    setPositions({
      ...positions,
      [key]: { x: data.x, y: data.y }
    });
  };

  return (
   <BuilderApp />
  );
}

export default App;
