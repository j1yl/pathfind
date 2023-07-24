"use client";

import React, { RefObject, createRef, useState } from "react";
import { Vertex } from "../classes/Vertex";
import { Dijkstra, backtrackToStart } from "../algorithms/Dijkstra";
import { CoordinatesType } from "../types/CoordinatesType";
import { NodeType } from "../types/NodeType";
import Bar from "./Bar";
import MazeNode from "./Node";
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

  const startEnd = initialStartEnd(props);
  const [startNode, setStartNode] = useState<CoordinatesType>(startEnd[0]);
  const [endNode, setEndNode] = useState<CoordinatesType>(startEnd[1]);

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
        ref.current?.classList.remove(styles.visited, styles.shortestPath);
      })
    );
  }

  function visualize() {
    resetGrid();

    const start = grid[startNode.x][startNode.y];
    const end = grid[endNode.x][endNode.y];

    if (selectedAlgo === "dijkstra") {
      const visitedNodes = Dijkstra(grid, start, end);
      const shortestPath = backtrackToStart(end);
      animate(visitedNodes, shortestPath);
    }
  }

  function animate(visitedNodes: Vertex[], shortestPath: Vertex[]) {
    for (let i = 1; i < visitedNodes.length - 1; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const ref = refs[node.x][node.y].current!;
        ref.classList.add(styles.visited);
      }, 10 * i);

      if (i === visitedNodes.length - 2) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
    }
  }

  function animateShortestPath(shortestPath: Vertex[]) {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const ref = refs[node.x][node.y].current!;
        ref.classList.add(styles.shortestPath);
      }, 50 * i);
    }
  }

  return (
    <>
      <Bar
        setSelectedAlgo={setSelectedAlgo}
        visualize={visualize}
        clearBoard={resetGrid}
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
            />
          ))
        )}
      </div>
    </>
  );
};

export default Maze;
