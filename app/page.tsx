"use client";

import Maze from "./components/Maze";

export default function Home() {
  return (
    <main>
      <Maze cols={30} rows={20} />
    </main>
  );
}
