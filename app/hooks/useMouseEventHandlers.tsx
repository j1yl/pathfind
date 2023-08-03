import { Dispatch, SetStateAction, useState } from "react";
import { NodeType } from "../types/NodeType";
import { Vertex } from "../classes/Vertex";
import { CoordinatesType } from "../types/CoordinatesType";

const useMouseEventHandlers = (
  grid: Vertex[][],
  setGrid: Dispatch<SetStateAction<Vertex[][]>>
) => {
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [isDraggingStart, setIsDraggingStart] = useState<boolean>(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState<boolean>(false);
  const [isUpdatingToWall, setIsUpdatingToWall] = useState<boolean>(false);

  const setWall = (x: number, y: number) => {
    const newGrid = grid.slice();
    newGrid[x][y].setWall();
    setGrid(newGrid);
  };

  const updateWall = (x: number, y: number) => {
    if (grid[x][y].isStartOrEnd()) return;

    setWall(x, y);
  };

  const handleMouseDown = (x: number, y: number) => {
    setIsMousePressed(true);
    setIsUpdatingToWall(grid[x][y].nodeType !== NodeType.Wall);

    updateWall(x, y);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (!isMousePressed) return;

    updateWall(x, y);
  };

  const handleMouseUp = (x: number, y: number) => {
    setIsMousePressed(false);
    setIsUpdatingToWall(grid[x][y].nodeType !== NodeType.Wall);
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};

export default useMouseEventHandlers;
