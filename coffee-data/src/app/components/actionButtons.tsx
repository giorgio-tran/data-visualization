"use client";

import React from "react";

type ActionButtonsProps = {
  onCategoryChange: (
    category: "coffee_imports" | "coffee_exports" | "coffee_production"
  ) => void;
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCategoryChange,
  category,
}) => {
  return (
    <div className="flex justify-center card w-full text-sm">
      <button
        onClick={() => onCategoryChange("coffee_imports")}
        className={`${
          category === "coffee_imports" ? "bg-transparent" : "bg-black/80"
        } focus:bg-transparent backdrop-blur-xl text-white px-4 py-2 rounded-l-lg  w-full border border-gray-800 hover:bg-black/50`}
      >
        Import
      </button>
      <button
        onClick={() => onCategoryChange("coffee_exports")}
        className={`${
          category === "coffee_exports" ? "bg-transparent" : "bg-black/80"
        } focus:bg-transparent backdrop-blur-xl text-white px-4 py-2 hover:bg-black/50 w-full border border-r-0  border-l-0 border-t-gray-800 border-b-gray-800`}
      >
        Export
      </button>
      <button
        onClick={() => onCategoryChange("coffee_production")}
        className={`${
          category === "coffee_production" ? "bg-transparent" : "bg-black/80"
        } focus:bg-transparent ease-in backdrop-blur-xl text-white px-4 py-2 rounded-r-lg w-full border border-gray-800 hover:bg-slate-800`}
      >
        Produced
      </button>
    </div>
  );
};

export default ActionButtons;
