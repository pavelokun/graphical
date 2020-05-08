import React, {useState} from 'react';
import Canvas from './Components/Canvas';
import Tools from './Components/Tools/Tools';
import classes from './App.module.scss';

function App() {
  const initialCanvasState = {
    x: null,
    y: null,
    isReset: false,
    color: '#000000',
    isEraser: false
  }
  const [canvasStateArray, setCanvasStateArray] = useState([initialCanvasState]);
  const [undoStack, setUndoStack] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const lastState = canvasStateArray[canvasStateArray.length - 1];

  const onMouseDown = (x, y) => {    
    setIsMouseDown(true);
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      x,
      y,
      color: lastState.color,
      isEraser: lastState.isEraser
    }]);
  }

  const onMouseMove = (x, y) => {
    if (isMouseDown) {
      setCanvasStateArray([...canvasStateArray, {
        ...initialCanvasState,
        x,
        y,
        color: lastState.color,
        isEraser: lastState.isEraser
      }]);
    }  
  }

  const onMouseUp = (x, y) => {
    setIsMouseDown(false);
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      x,
      y,
      color: lastState.color,
      isEraser: lastState.isEraser
    }]);
  }

  const onMouseLeave = () => {
    setIsMouseDown(false);
  }

  const onReset = () => {
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      isReset: true, 
      color: lastState.color,
      isEraser: lastState.isEraser
    }]);
  }

  const onDraw = () => {
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      color: lastState.color,
      isEraser: false 
    }]);
  }

  const onErase = () => {
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      color: lastState.color,
      isEraser: true 
    }]);
  }

  const onColorChange = (color) => {
    setCanvasStateArray([...canvasStateArray, {
      ...initialCanvasState,
      color,
      isEraser: lastState.isEraser 
    }]);
  }

  const onUndo = () => {
    if (canvasStateArray.length > 1) { 
      setUndoStack([...undoStack, lastState]);
      setCanvasStateArray(canvasStateArray.slice(0, -1));
    }        
  }

  const onRedo = () => {
    if (undoStack.length) {
      setCanvasStateArray([...canvasStateArray, undoStack[undoStack.length - 1]]);
      setUndoStack(undoStack.slice(0, -1));
    }    
  }

  return (
    <div className={classes.app}>
      <Tools onRedo={onRedo}
             onUndo={onUndo}
             onDraw={onDraw}
             onErase={onErase}
             onReset={onReset}
             onColorChange={onColorChange}
             color={lastState.color}
             isEraser={lastState.isEraser}
      />
      <Canvas onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              canvasStateArray={canvasStateArray}
      />
    </div>
  );
}

export default App;
