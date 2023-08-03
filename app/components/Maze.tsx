"use client";

import React, { RefObject, createRef, useState } from "react";
import Bar from "./Bar";
import MazeNode from "./Node";
import { backtrackToStart } from "../lib/helpers";
import useMouseEventHandlers from "../hooks/useMouseEventHandlers";
import { Vertex } from "../classes/Vertex";
import { Dijkstra } from "../algorithms/Dijkstra";
import { AStar } from "../algorithms/AStar";
import { CoordinatesType } from "../types/CoordinatesType";
import { NodeType } from "../types/NodeType";
import styles from "../styles/nodestyles.module.css";

type Props = {
  cols: number;
  rows: number;
};

const Maze = (props: Props) => {
  const [selectedAlgo, setSelectedAlgo] = useState<string>("");

  const initialStartEnd = (p: Props): CoordinatesType[] => {
    return [
      { x: Math.trunc(p.rows / 2), y: Math.trunc(p.cols / 5) },
      { x: Math.trunc(p.rows / 2), y: Math.trunc((p.cols * 4) / 5) - 1 },
    ];
  };

  function initialNodeType(
    x: number,
    y: number,
    start: CoordinatesType,
    end: CoordinatesType
  ) {
    return x === start.x && y === start.y
      ? NodeType.Start
      : x === end.x && y === end.y
      ? NodeType.End
      : NodeType.Default;
  }

  const [start, end] = initialStartEnd(props);
  const [startNode, setStartNode] = useState<CoordinatesType>(start);
  const [endNode, setEndNode] = useState<CoordinatesType>(end);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const initialRefs = Array.from({ length: props.rows }, (_) =>
    Array.from({ length: props.cols }, (_) => createRef<HTMLDivElement>())
  );
  const [refs] = useState<RefObject<HTMLDivElement>[][]>(initialRefs);

  const initialGrid = Array.from({ length: props.rows }, (_, x) =>
    Array.from({ length: props.cols }, (_, y) => {
      const nodeType = initialNodeType(x, y, startNode, endNode);
      return new Vertex(x, y, nodeType);
    })
  );
  const [grid, setGrid] = useState<Vertex[][]>(initialGrid);

  function resetGrid() {
    refs.forEach((row, x) =>
      row.forEach((ref, y) => {
        grid[x][y].reset();
        ref.current?.classList.remove(
          styles.visited,
          styles.shortestPath,
          styles.wall
        );
      })
    );
  }

  const resetWall = () => {
    refs.forEach((row, i) =>
      row.forEach((ref, j) => {
        if (grid[i][j].isStartOrEnd()) return;

        grid[i][j].clearWall();
      })
    );
    const temp = [...grid];
    setGrid(temp);
  };

  const reset = () => {
    resetWall();
    resetGrid();
  };

  const handlers = useMouseEventHandlers(grid, setGrid);

  function visualize() {
    resetGrid();
    const start = grid[startNode.x][startNode.y];
    const end = grid[endNode.x][endNode.y];

    switch (selectedAlgo) {
      case "dijkstra":
        const dijkstraVisitedNodes = Dijkstra(grid, start, end);
        const dijkstraShortestPath = backtrackToStart(end);
        animate(dijkstraVisitedNodes, dijkstraShortestPath, "dijkstra");
        break;
      case "astar":
        const astarVisitedNodes = AStar(grid, start, end);
        const astarShortestPath = backtrackToStart(end);
        animate(astarVisitedNodes, astarShortestPath, "astar");
        break;
    }
  }

  function animate(
    visitedNodes: Vertex[],
    shortestPath: Vertex[],
    name: string
  ) {
    const speed = name === "dijkstra" ? 3 : 20;
    const delay = name === "dijkstra" ? 3 : 20;
    setIsRunning(true);
    for (let i = 1; i < visitedNodes.length - 1; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const ref = refs[node.x][node.y].current!;
        ref.classList.add(styles.visited);
      }, speed * i);

      if (i === visitedNodes.length - 2) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
          setIsRunning(false);
          return;
        }, delay * i);
      }
    }
  }

  function animateShortestPath(shortestPath: Vertex[]) {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const ref = refs[node.x][node.y].current!;
        ref.classList.add(styles.shortestPath);
      }, 40 * i);
    }
  }

  return (
    <>
      <Bar
        isRunning={isRunning}
        setSelectedAlgo={setSelectedAlgo}
        visualize={visualize}
        clearBoard={reset}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
          gridTemplateRows: `repeat(${props.rows}, 1fr)`,
          gap: "4px",
          width: "max-content",
        }}
      >
        {refs.map((row, x) =>
          row.map((node, y) => (
            <MazeNode
              x={x}
              y={y}
              key={`node-${x}-${y}`}
              nodeRef={node}
              vertex={grid[x][y]}
              handleMouseDown={handlers.handleMouseDown}
              handleMouseEnter={handlers.handleMouseEnter}
              handleMouseUp={handlers.handleMouseUp}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Maze;
