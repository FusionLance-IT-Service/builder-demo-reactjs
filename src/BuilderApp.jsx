import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

const gridSize = 20;

const BuilderApp = () => {
  const [stall, setStall] = useState({ x: 100, y: 100 });
  const hallWidth = 400;
  const hallHeight = 400;
  const stallWidth =40;
  const stallHeight = 40;

  const miniMapScaleFactor = 0.2; // MiniMap scaling

  // Function to constrain the stall within the hall boundaries during dragging
  const keepStallInBounds = (x, y) => {
    // Boundaries to prevent the stall from moving outside the hall
    const boundedX = Math.max(0, Math.min(x, hallWidth - stallWidth));
    const boundedY = Math.max(0, Math.min(y, hallHeight - stallHeight));
    return { x: boundedX, y: boundedY };
  };

  // While dragging, ensure the stall stays within bounds
  const handleDragMove = (e) => {
    const { x, y } = e.target.position();
    const newPos = keepStallInBounds(x, y);

    // Directly set the position of the dragged object, so it doesn't go outside
    e.target.x(newPos.x);
    e.target.y(newPos.y);
    setStall(newPos);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Main Builder Canvas */}
      <Stage width={400} height={400} style={{ border: '1px solid black' }}>
        <Layer>
          {/* Hall grid */}
          <Rect width={hallWidth} height={hallHeight} fill="lightgray" />
          {[...Array(hallWidth / gridSize)].map((_, i) => (
            <Rect key={i} x={i * gridSize} y={0} width={1} height={hallHeight} fill="#ddd" />
          ))}
          {[...Array(hallHeight / gridSize)].map((_, i) => (
            <Rect key={i} x={0} y={i * gridSize} width={hallWidth} height={1} fill="#ddd" />
          ))}

          {/* Draggable Stall Group */}
          <Group
            x={stall.x}
            y={stall.y}
            draggable
            onDragMove={handleDragMove} // Call during dragging
          >
            <Rect width={stallWidth} height={stallHeight} fill="green" />
            <Text text="Stall" x={10} y={15} fill="white" />
          </Group>
        </Layer>
      </Stage>

      {/* Mini-Map */}
      <div style={{ marginLeft: '20px' }}>
        <Stage width={hallWidth * miniMapScaleFactor} height={hallHeight * miniMapScaleFactor} style={{ border: '1px solid black' }}>
          <Layer>
            <Rect
              width={hallWidth * miniMapScaleFactor}
              height={hallHeight * miniMapScaleFactor}
              fill="lightgray"
            />
            <Rect
              x={stall.x * miniMapScaleFactor}
              y={stall.y * miniMapScaleFactor}
              width={stallWidth * miniMapScaleFactor}
              height={stallHeight * miniMapScaleFactor}
              fill="green"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default BuilderApp;
