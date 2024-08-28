import React, { useState, useEffect } from "react";

interface DraggableProps {
  children: React.ReactNode;
  isDraggable: boolean;
  dialogOpen: boolean;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  isDraggable,
  dialogOpen,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dialogOpen && isDraggable) {
      setStartPosition(true);
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, dialogOpen, isDraggable]);

  return (
    <div
      style={
        startPosition
          ? { top: `${position.y}px`, left: `${position.x}px` }
          : { top: "auto", bottom: "40px", right: "130px", left: "auto" }
      }
      onMouseDown={handleMouseDown}
      className="fixed z-10 cursor-grab"
    >
      {children}
    </div>
  );
};

export default Draggable;
