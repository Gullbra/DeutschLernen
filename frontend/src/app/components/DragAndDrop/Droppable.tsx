import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: {
  id: string,
  style?: React.CSSProperties,
  overStyle?: React.CSSProperties,
  children?: React.ReactNode | null, 
}) {
  const {isOver, setNodeRef} = useDroppable({id: props.id});

  const styles = {
    ...props.style,
    ...(isOver ? props.overStyle : {}),
  };

  return (<div ref={setNodeRef} style={styles}>{props.children}</div>);
}
