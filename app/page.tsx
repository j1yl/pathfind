"use client";

import { useState } from "react";
import Bar from "./components/Bar";
import Maze from "./components/Maze";

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
      <Maze cols={30} rows={20} />
    </main>
  );
}
