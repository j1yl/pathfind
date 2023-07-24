import React, { RefObject } from "react";
import { Vertex } from "../classes/Vertex";
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
            ? "#0ec23e"
            : props.vertex.nodeType === NodeType.End
            ? "#c20e2f"
            : "",
      }}
      className="w-4 border-neutral-600 rounded-full border h-auto aspect-square transition-colors duration-150 ease-in-out"
    />
  );
};

export default MazeNode;
