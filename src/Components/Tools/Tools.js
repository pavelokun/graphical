import React from 'react';
import Tool from './Tool';
import classes from './Tools.module.scss';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {faPaintBrush} from '@fortawesome/free-solid-svg-icons';
import {faEraser} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const Tools = ({onRedo, onUndo, onDraw, onErase, onReset, onColorChange, color, isEraser}) => {

  return (
    <div className={classes.tools}>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Tool name='Undo'
                onClick={onUndo}
                icon={faLongArrowAltLeft}
          />
        </li>
        <li className={classes.li}>
          <Tool name='Redo'
                onClick={onRedo}
                icon={faLongArrowAltRight}
          />
        </li>
        <li className={classes.li}>
          <Tool name='Brush'
                onClick={onDraw}
                icon={faPaintBrush}
                isEraser={!isEraser} 
          /> 
        </li>
        <li className={classes.li}>
          <Tool name='Eraser'
                onClick={onErase} 
                icon={faEraser}
                isEraser={isEraser}  
          />
        </li>
        <li className={classes.li}>
          <Tool name='Reset'
                onClick={onReset}
                icon={faTrash} 
          />
        </li>
        <li className={classes.li}>
          <input
            className={classes.input} 
            type="color" 
            name="Color" 
            value={color} 
            onChange={(event) => onColorChange(event.target.value)} 
          />
        </li>
      </ul>
    </div>
  )
};

export default Tools;