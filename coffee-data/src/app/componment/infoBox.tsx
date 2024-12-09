"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const contentData = [
  {
    title: "Data Visualization Project",
    content: (
      <p className="text-sm text-gray-300 text-opacity-60 break-words">
        Welcome to the Coffee Data Visualization project! This project aims to
        provide an insightful and interactive visualization of global coffee
        production and consumption trends. By leveraging data sourced from the
        official International Coffee Organization (ICO), we present a clear and
        detailed view of how coffee is produced and consumed worldwide. Through
        this visualization, users can explore the intricate relationships
        between coffee production and consumption, and gain a better
        understanding of the global coffee market. For detailed information on
        the data processing and analysis, please visit the project&apos;s{" "}
        <a
          href="https://github.com/Team-13-2024"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 text-opacity-60 hover:underline cursor-pointer"
        >
          GitHub repository
        </a>
        .
      </p>
    ),
  },
  {
    title: "About Dataset",
    content: (
      <p className="text-sm text-gray-300 text-opacity-60 break-words">
        This dataset provides information on coffee production and consumption,
        with all data sourced from the official International Coffee
        Organization (ICO) website. The original data, available{" "}
        <a
          href="https://www.ico.org/new_historical.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 text-opacity-60 hover:underline cursor-pointer"
        >
          here
        </a>
        , was processed and formatted for analysis using a JupyterLab Python
        notebook. Detailed information about the notebook and its implementation
        can be found in the project&apos;s{" "}
        <a
          href="https://github.com/MSI17819/Coffee_data_analysis/blob/main/Coffee_codeimpro.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 text-opacity-60 hover:underline cursor-pointer"
        >
          Coffee Data Analysis
        </a>{" "}
        GitHub repository. The statistics in the dataset are presented in
        kilograms (units of 1,000 grams).
      </p>
    ),
  },
  {
    title: "Page 3",
    content: (
      <p className="text-sm text-gray-300 text-opacity-60 break-words">
        page 3 content
      </p>
    ),
  },
];

const InfoBox = () => {
  const [currentContent, setCurrentContent] = useState(1);

  const handleNextContent = () =>
    setCurrentContent((prev) => Math.min(prev + 1, contentData.length));
  const handlePreviousContent = () =>
    setCurrentContent((prev) => Math.max(prev - 1, 1));

  const { title, content } = contentData[currentContent - 1];

  return (
    <div className="mt-12 bg-black text-white shadow-lg rounded-lg p-6 w-[360px] h-[300px] border border-gray-900 flex flex-col">
      <div className="text-xl text-opacity-90 text-gray-300 font-bold mb-4 pl-4">
        <h2>{title}</h2>
      </div>
      <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 mb-6 pl-4 pr-2 scrollbar-thin">
        {content}
      </div>
      <div className="flex justify-center space-x-4 pb-2 mt-auto">
        <button
          onClick={handlePreviousContent}
          disabled={currentContent === 1}
          className="text-white hover:text-blue-600 text-sm font-semibold bg-transparent border-0 cursor-pointer flex items-center"
        >
          <ChevronLeft className="mr-2 w-6 h-6" />
        </button>
        <button
          onClick={handleNextContent}
          disabled={currentContent === contentData.length}
          className="text-white hover:text-blue-600 text-sm font-semibold bg-transparent border-0 cursor-pointer flex items-center"
        >
          <ChevronRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InfoBox;
