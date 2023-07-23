import React from "react";

type Props = {
  x: number;
  y: number;
};

const MazeNode = (props: Props) => {
  return (
    <div className="rounded-full w-4 h-auto aspect-square bg-orange-600" />
  );
};

export default MazeNode;
