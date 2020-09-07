import React from 'react';
import style from './style.module.scss';

function Tag({ type, children, color }) {
  return (
    <span
      className={`text-nowrap ${style.tag} ${
        type === undefined ? style.default : style[type.toLowerCase()]
      }`}
      style={color !== undefined ? { color } : {}}
    >
      {children}
    </span>
  );
}

export default Tag;
