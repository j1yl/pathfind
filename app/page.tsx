"use client";

import Link from "next/link";
import Maze from "./components/Maze";
import useWindowSize from "./hooks/useWindowSize";
import { useEffect, useState } from "react";

export default function Home() {
  const { width, height } = useWindowSize();
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const nodeSize = 16;

  useEffect(() => {
    if (width === undefined || height === undefined) {
      // console.log("Device undefined");
    } else if (width >= 700) {
      // console.log("Device PC");
      setRows(Math.trunc((height / nodeSize) * 0.4));
      setCols(Math.min(Math.trunc((width / nodeSize) * 0.5), 50));
    } else {
      // console.log("Device SmartPhone");
      setRows(Math.trunc((height / nodeSize) * 0.4));
      setCols(Math.trunc((width / nodeSize) * 0.8));
    }
  }, [width, height]);

  // console.log(`[w: ${width}, h: ${height}], [rows: ${rows}, cols: ${cols}]`);

  return (
    <main className="flex flex-col items-center gap-8 md:gap-16">
      <Maze key={cols} cols={cols} rows={rows} />
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <div className="bg-[#0ec23e] h-4 w-4 border-neutral-600 rounded-full border aspect-square" />
          <p>Start</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#c20e2f] h-4 w-4 border-neutral-600 rounded-full border aspect-square" />
          <p>End</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#ffee35] h-4 w-4 border-neutral-600 rounded-full border aspect-square" />
          <p>Shortest Path</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#879bff] h-4 w-4 border-neutral-600 rounded-full border aspect-square" />
          <p>Visited Node</p>
        </div>
      </div>
      <div className="text-center">
        Built by{" "}
        <Link
          href="https://github.com/j1yl"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          Joe Lee
        </Link>{" "}
        and{" "}
        <Link
          href="https://github.com/DavidJSolano"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          David Solano
        </Link>{" "}
        using{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          href="https://react.dev/"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          React
        </Link>
        ,{" "}
        <Link
          href="https://tailwindcss.com/"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          Tailwind CSS
        </Link>
        ,{" "}
        <Link
          href="https://daisyui.com/"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          DaisyUI
        </Link>
        , and{" "}
        <Link
          href="https://www.typescriptlang.org/"
          target="_blank"
          className="underline"
          referrerPolicy="no-referrer"
        >
          TypeScript
        </Link>
        .
      </div>
    </main>
  );
}
