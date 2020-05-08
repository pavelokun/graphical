import React, { useState } from 'react';
import classes from './Tool.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tool = ({icon, onClick, name, isEraser}) => {
  const [style, setStyle] = useState(classes.icon);

  return (
    <button className={classes.button}>
      <FontAwesomeIcon
        onMouseEnter={() => setStyle(classes.icon_active)}
        onMouseLeave={() => setStyle(classes.icon)}
        className={isEraser ? classes.icon_active : style}
        size="2x"
        name={name} 
        onClick={onClick}
        icon={icon}
      />
    </button>    
  )
};

export default Tool;