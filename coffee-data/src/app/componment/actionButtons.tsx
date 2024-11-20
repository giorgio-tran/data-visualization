"use client";

import React from "react";

type ActionButtonsProps = {
  onCategoryChange: (
    category: "coffee_imports" | "coffee_exports" | "coffee_production"
  ) => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCategoryChange }) => {
  return (
    <div className="mt-6 flex justify-center card">
      <button
        onClick={() => onCategoryChange("coffee_imports")}
        className="bg-black/70 backdrop-blur-xl text-white px-4 py-2 rounded-l-lg  w-24 border border-gray-800 hover:bg-slate-800"
      >
        Import
      </button>
      <button
        onClick={() => onCategoryChange("coffee_exports")}
        className="bg-black/70 backdrop-blur-xl text-white px-4 py-2 hover:bg-slate-800 w-24 border border-r-0  border-l-0 border-t-gray-800 border-b-gray-800"
      >
        Export
      </button>
      <button
        onClick={() => onCategoryChange("coffee_production")}
        className="bg-black/70 backdrop-blur-xl text-white px-4 py-2 rounded-r-lg w-24 border border-gray-800 hover:bg-slate-800"
      >
        Produced
      </button>
    </div>
  );
};

export default ActionButtons;
