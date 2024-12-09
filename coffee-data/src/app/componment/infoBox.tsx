"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const contentData = [
  {
    title: "About",
    content: (
      <p className="text-sm text-gray-300 break-words">
        This project aims to show users trends in the imports, exports, and
        production of coffee worldwide from 1990 to 2019, using data collected
        by the International Coffee Organization (ICO). The repository can be
        found here:{" "}
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
    title: "Contributors",
    content: (
      <p className="text-sm text-white break-words">
        The contributors to this project are: Giorgio Tran, Feimei Chen, and Hok
        Wai Chan
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
    <div className="mt-12 bg-black/70 backdrop-blur-lg text-white shadow-lg rounded-lg p-4 w-[360px] h-[300px] border border-gray-800 flex flex-col">
      <div className="text-xl text-white font-bold mb-4">
        <h2>{title}</h2>
      </div>
      <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 mb-6 scrollbar-thin">
        {content}
      </div>
      <div className="flex justify-center space-x-4 pb-2 mt-auto">
        <button
          onClick={handlePreviousContent}
          disabled={currentContent === 1}
          className="text-white hover:text-indigo-700 text-sm font-semibold bg-transparent border-0 cursor-pointer flex items-center"
        >
          <ChevronLeft className="mr-2 w-6 h-6" />
        </button>
        <button
          onClick={handleNextContent}
          disabled={currentContent === contentData.length}
          className="text-white hover:text-indigo-700 text-sm font-semibold bg-transparent border-0 cursor-pointer flex items-center"
        >
          <ChevronRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InfoBox;
