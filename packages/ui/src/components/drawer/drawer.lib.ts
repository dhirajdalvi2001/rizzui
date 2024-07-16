import { MouseEvent, useEffect, useRef, useState } from 'react';
import { drawerClasses, isPlacementOnYAxis } from './drawer';

export type ResizeProps = {
  placement: keyof typeof drawerClasses.placement;
  customSize?: number;
};

function calCulate(width: number, movement: number, param: 'add' | 'sub') {
  if (param === 'add') {
    return width + Math.abs(movement);
  } else {
    return width - Math.abs(movement);
  }
}

export function useResizeHandler({ placement, customSize = 384 }: ResizeProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [startPosition, setStartPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  let containerInitialSize = isPlacementOnYAxis(placement)
    ? containerRef.current?.clientHeight
    : containerRef.current?.clientWidth;
  const [width, setWidth] = useState<number>(
    containerInitialSize ?? customSize
  );

  useEffect(() => {
    const handleResize = (e: globalThis.MouseEvent) => {
      let movement = 0;
      let newWidth = 0;
      if (placement === 'right') {
        movement = e.clientX - startPosition;
        if (movement > 0) {
          newWidth = calCulate(width, movement, 'sub');
        } else {
          newWidth = calCulate(width, movement, 'add');
        }
      } else if (placement === 'left') {
        movement = e.clientX - startPosition;
        if (movement > 0) {
          newWidth = calCulate(width, movement, 'add');
        } else {
          newWidth = calCulate(width, movement, 'sub');
        }
      } else if (placement === 'top') {
        movement = e.clientY - startPosition;
        if (movement > 0) {
          newWidth = calCulate(width, movement, 'add');
        } else {
          newWidth = calCulate(width, movement, 'sub');
        }
      }
      if (placement === 'bottom') {
        movement = e.clientY - startPosition;
        if (movement > 0) {
          newWidth = calCulate(width, movement, 'sub');
        } else {
          newWidth = calCulate(width, movement, 'add');
        }
      }
      setWidth(() => newWidth);
    };
    const handleMouseUp = () => {
      setIsResizing(() => false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setWidth(() => containerInitialSize ?? (width ? width : customSize));
    setStartPosition(() =>
      isPlacementOnYAxis(placement) ? e.clientY : e.clientX
    );
    setIsResizing(() => true);
  };

  return { handleMouseDown, width, containerRef };
}
