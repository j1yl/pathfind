"use client";

import React from "react";

interface MyWindow extends Window {
  my_modal_5?: {
    showModal: () => void;
  };
}

type Props = {
  setSelectedAlgo: (algo: string) => void;
  visualize: () => void;
  clearBoard: () => void;
  isRunning: boolean;
};

const Bar = (props: Props) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-4 justify-between items-center">
      <select
        className="select select-sm select-primary w-full max-w-xs"
        onChange={(e) => {
          props.setSelectedAlgo(e.target.value);
        }}
        defaultValue={"default"}
      >
        <option disabled value="default">
          PICK YOUR ALGORITHM
        </option>
        <option value="dijkstra">DIJKSTRA&apos;S</option>
        <option value="astar">A*</option>
      </select>
      <div className="flex xs:flex-wrap gap-2 w-full md:justify-end justify-center ">
        <button
          className={` btn btn-sm btn-outline ${
            props.isRunning && "btn-disabled"
          }`}
          onClick={() => props.visualize()}
        >
          Visualize
        </button>
        <button
          className={`btn btn-sm btn-outline ${
            props.isRunning && "btn-disabled"
          }`}
          onClick={() => props.clearBoard()}
        >
          Reset
        </button>
        <div className=" w-max">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              if (typeof window !== "undefined") {
                const myWindow = window as MyWindow;
                myWindow.my_modal_5?.showModal();
              }
            }}
          >
            Help
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">
                Welcome to our Pathfinding Visualizer!
              </h3>
              <p>
                This tool helps you understand and visualize various pathfinding
                algorithms in action.
              </p>
              <p>
                To use it, simply click on the nodes to create walls and
                obstacles.
              </p>
              <p>
                Select your preferred algorithm from the options available. Once
                you've set up the grid, click the 'Visualize' button to see the
                magic happen!
              </p>
              <p>
                Watch as the application intelligently navigates through the
                maze, finding the shortest path from the start node to the
                target node.
              </p>
              <div className="modal-action">
                <button className="btn btn-sm btn-error">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Bar;
