import React, { RefObject } from "react";
import { Vertex } from "../classes/Vertex";
import { NodeType } from "../types/NodeType";
import { useEffect } from "react";
import { useState } from "react";

type Props = {
  x: number;
  y: number;
  nodeRef: RefObject<HTMLDivElement>;
  vertex: Vertex;
  handleMouseDown: (x: number, y: number) => void;
  handleMouseEnter: (x: number, y: number) => void;
  handleMouseUp: (x: number, y: number) => void;
};

const MazeNode = (props: Props) => {
  useEffect(() => {
    props.nodeRef.current!.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = () => {
    console.log("mouse down!");
    props.handleMouseDown(props.x, props.y);
  };

  const handleMouseEnter = () => {
    props.handleMouseEnter(props.x, props.y);
    console.log("Mouse Enter");
  };

  const handleMouseUp = () => {
    props.handleMouseUp(props.x, props.y);
    console.log("Mouse up!");
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    props.handleMouseDown(props.x, props.y);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const x = touch.pageX - window.scrollX;
    const y = touch.pageY - window.scrollY;

    var elm = document.elementFromPoint(x, y) as HTMLElement;
    const i = Number(elm.dataset.x);
    const j = Number(elm.dataset.y);

    props.handleMouseEnter(i, j);
  };

  const handleTouchEnd = (_: React.TouchEvent) => {
    props.handleMouseUp(props.x, props.y);
  };
  return (
    <div
      ref={props.nodeRef}
      data-x={props.x}
      data-y={props.y}
      title={`${props.x}, ${props.y}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor:
          props.vertex.nodeType === NodeType.Start
            ? "#0ec23e"
            : props.vertex.nodeType === NodeType.End
            ? "#c20e2f"
            : "",
      }}
      className={`w-4 border-neutral-600 rounded-full border h-auto aspect-square transition-colors duration-150 ease-in-out ${
        props.vertex.isWall() && "bg-black"
      }`}
    />
  );
};

export default MazeNode;
