'use client'

import React, { useState } from "react";

const InfoBox = () => {
  const [currentContent, setCurrentContent] = useState(1);

  const handleNextContent = () => {
    setCurrentContent(currentContent + 1);
  };

  const handlePreviousContent = () => {
    setCurrentContent(currentContent - 1);
  };

  const renderContent = () => {
    if (currentContent === 1) {
      return (
        <div>
          <p className="text-sm text-gray-300 break-words">
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
            Dataset contains information about coffee production and consumption.
            All data are available from the official ICO website:
            https://www.ico.org/new_historical.asp
          </p>
        </div>
      );
    } else if (currentContent === 2) {
      return (
        <div>
          <p className="text-sm text-gray-300 break-words">
            page 2 content
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-sm text-gray-300 break-words">
            page 3 content
          </p>
        </div>
      );
    }
  };

  return (
    <div className="mt-12 bg-black text-white shadow-lg rounded-lg p-6 w-[360px] h-[445px] border border-gray-900 flex flex-col">
      <div className="text-xl font-bold mb-4 pl-4">
        {currentContent === 1 && <h3>About the dataset</h3>}
        {currentContent === 2 && <h3>Page 2</h3>}
        {currentContent === 3 && <h3>Page 3</h3>}
      </div>
      <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 mb-6 pl-4 pr-2">
        {renderContent()}
      </div>
      <div className="flex justify-center space-x-4 pb-2 mt-auto">
        <button
          onClick={handlePreviousContent}
          disabled={currentContent === 1}
          className="text-white hover:text-blue-600 text-sm font-semibold bg-transparent border-0 cursor-pointer"
        >
          <span className="mr-2">←</span> Previous
        </button>
        <button
          onClick={handleNextContent}
          className="text-white hover:text-blue-600 text-sm font-semibold bg-transparent border-0 cursor-pointer"
        >
          Next <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default InfoBox;