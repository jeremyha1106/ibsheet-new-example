import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './style.module.scss';

const type = 'DragableBodyRow';

const DragableBodyRow = ({
  index,
  record,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    // prevent drag when user editing textarea
    canDrag: () => !record.isFocus,
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className} ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

export default DragableBodyRow;
