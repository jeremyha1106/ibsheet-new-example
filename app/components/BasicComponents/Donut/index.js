import React from 'react';
import style from './style.module.scss';

function Donut(props) {
  const { name, color, type } = props;
  return (
    <span className="mr-2 text-nowrap">
      <span
        className={`${style.donut} ${color === undefined ? style[type] : ''}`}
        style={color !== undefined ? { borderColor: color } : {}}
      />
      {name}
    </span>
  );
}

Donut.defaultProps = {
  name: 'Donut',
  type: 'default',
  color: undefined,
};

export default Donut;
