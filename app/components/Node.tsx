import React, { RefObject } from "react";
import { Vertex } from "../algorithms/Vertex";
import { NodeType } from "../types/NodeType";

type Props = {
  x: number;
  y: number;
  nodeRef: RefObject<HTMLDivElement>;
  vertex: Vertex;
};

const MazeNode = (props: Props) => {
  return (
    <div
      ref={props.nodeRef}
      data-i={props.x}
      data-j={props.y}
      title={`${props.x}, ${props.y}`}
      style={{
        backgroundColor:
          props.vertex.nodeType === NodeType.Start
            ? "#03fc41"
            : props.vertex.nodeType === NodeType.End
            ? "#fa4028"
            : "transparent",
      }}
      className="rounded-full w-4 h-auto aspect-square border border-neutral-500"
    />
  );
};

export default MazeNode;
