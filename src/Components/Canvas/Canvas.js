import React, { useRef, useEffect } from 'react';
import classes from './Canvas.module.scss';

const Canvas = ({onMouseDown, onMouseMove, onMouseUp, onMouseLeave, canvasStateArray}) => {
  const canvas = useRef();

  useEffect(() => {    
    const ctx = canvas.current.getContext('2d');
    const {width, height} = canvas.current;
    ctx.clearRect(0, 0, width, height);
    const lineWidth = 10;
    canvasStateArray.forEach(state => {   
      if (state.isReset) {
        ctx.clearRect(0, 0, width, height);
      }
      if (state.x) {
        if (state.isEraser) {
          ctx.clearRect(state.x, state.y, lineWidth, lineWidth);
        } else {
          ctx.fillStyle = state.color;
          ctx.fillRect(state.x, state.y, lineWidth, lineWidth);
        }  
      } 
    })
  }, [canvasStateArray]);

  return (
    <div className={classes.canvas_wrapper}>
      <canvas
        className={canvasStateArray[canvasStateArray.length - 1].isEraser ? classes.canvas_eraser : classes.canvas_brush}        
        ref={canvas}
        width={800}
        height={600} 
        onMouseDown={(event) => onMouseDown(event.nativeEvent.offsetX, event.nativeEvent.offsetY)} 
        onMouseMove={(event) => onMouseMove(event.nativeEvent.offsetX, event.nativeEvent.offsetY)} 
        onMouseUp={(event) => onMouseUp(event.nativeEvent.offsetX, event.nativeEvent.offsetY)}
        onMouseLeave={onMouseLeave}
      />
    </div>  
  )
};

export default Canvas;