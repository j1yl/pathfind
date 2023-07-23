"use client";

import React, { RefObject, createRef, useState } from "react";
import { Vertex } from "../algorithms/Vertex";
import { CoordinatesType } from "../types/CoordinatesType";
import { NodeType } from "../types/NodeType";
import MazeNode from "./Node";

type Props = {
  cols: number;
  rows: number;
};

const Maze = (props: Props) => {
  const initialStartEnd = (p: Props): CoordinatesType[] => {
    return [
      { x: Math.trunc(p.rows / 2), y: Math.trunc(p.cols / 5) },
      { x: Math.trunc(p.rows / 2), y: Math.trunc((p.cols * 4) / 5) - 1 },
    ];
  };

  const startEnd = initialStartEnd(props);

  const [startNode, setStartNode] = useState<CoordinatesType>(startEnd[0]);
  const [endNode, setEndNode] = useState<CoordinatesType>(startEnd[1]);

  const initialRefs = Array.from({ length: props.rows }, (_) =>
    Array.from({ length: props.cols }, (_) => createRef<HTMLDivElement>())
  );

  const [refs] = useState<RefObject<HTMLDivElement>[][]>(initialRefs);

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

  const initialGrid = Array.from({ length: props.rows }, (_, x) =>
    Array.from({ length: props.cols }, (_, y) => {
      const nodeType = initialNodeType(x, y, startNode, endNode);
      return new Vertex(x, y, nodeType);
    })
  );

  const [grid, setGrid] = useState<Vertex[][]>(initialGrid);

  return (
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
  );
};

export default Maze;
