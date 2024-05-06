import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [ mousePosition, setMousePosition ] = useState({ x: null, y: null });
  
  useEffect(() => {
    const grid = document.getElementById("grid")
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    grid.addEventListener('mousemove', updateMousePosition);

    return () => {
      grid.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};