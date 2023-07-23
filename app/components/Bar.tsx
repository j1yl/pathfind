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
};

const Bar = (props: Props) => {
  const my_window = window as MyWindow;

  return (
    <div className="w-full flex md:flex-row flex-col gap-2 justify-between my-8">
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => {
          props.setSelectedAlgo(e.target.value);
        }}
      >
        <option disabled selected>
          Pick your algorithm
        </option>
        <option value={"dijkstra"}>Dijkstra&apos;s</option>
      </select>
      <div className="flex gap-2 w-full">
        <button className="btn" onClick={() => props.visualize()}>
          Visualize
        </button>
        <button className="btn" onClick={() => props.clearBoard()}>
          Clear
        </button>
        <div className="w-max">
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn"
            onClick={() => my_window.my_modal_5?.showModal()}
          >
            help
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
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
