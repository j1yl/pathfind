"use client";

import { useState } from "react";
import MazeNode from "./components/Node";
import Bar from "./components/Bar";

export default function Home() {
  const [selectedAlgo, setSelectedAlgo] = useState<string>("");

  function visualize() {
    console.log("visualize", selectedAlgo);
  }

  function clearBoard() {
    console.log("board is cleared");
  }

  return (
    <main>
      <Bar
        setSelectedAlgo={setSelectedAlgo}
        visualize={visualize}
        clearBoard={clearBoard}
      />
      <MazeNode x={0} y={0} />
    </main>
  );
}
