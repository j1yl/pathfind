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
  clearWalls: () => void;
  isRunning: boolean;
};

const Bar = (props: Props) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-4 justify-between items-center">
      <select
        className="select select-primary w-full max-w-xs"
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
        <p className="pt-1 xs:pt-2 font-bold text-center">
          Click Node to add Walls
        </p>
        <button
          className={` btn btn-outline ${props.isRunning && "btn-disabled"}`}
          onClick={() => props.visualize()}
        >
          Visualize
        </button>
        <button
          className={`btn btn-outline ${props.isRunning && "btn-disabled"}`}
          onClick={() => props.clearBoard()}
        >
          Reset
        </button>
        <button
          className={` btn btn-outline ${props.isRunning && "btn-disabled"}`}
          onClick={() => props.clearWalls()}
        >
          Clear Walls
        </button>
        <div className=" w-max">
          <button
            className="btn btn-outline"
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
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Please select an algorithm and click visualize to see the magic.
              </p>
              <p className="py-4">
                Use the clear button to clear the board and start over.
              </p>
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Bar;
