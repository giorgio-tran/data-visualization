"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import Image from "next/image";

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
      <>
        <ul className="text-sm text-white list-disc ml-6 space-y-4">
          <li className="flex items-center space-x-3">
            <Image
              src="https://github.com/giorgio-tran.png"
              alt="Giorgio Tran"
              className="w-11 h-11 rounded-full"
              width="44"
              height="44"
            />
            <div>
              <span className="font-semibold">Giorgio Tran</span>
              <br />
              <a
                href="https://giorgio-tran.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 underline"
              >
                GitHub Profile
              </a>
            </div>
          </li>
          <li className="flex items-center space-x-3">
            <Image
              src="https://github.com/feimeichen.png"
              alt="Feimei Chen"
              className="w-11 h-11 rounded-full"
              width="44"
              height="44"
            />
            <div>
              <span className="font-semibold">Feimei Chen</span>
              <br />
              <a
                href="https://feimeichen.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 underline"
              >
                GitHub Profile
              </a>
            </div>
          </li>
          <li className="flex items-center space-x-3">
            <Image
              src="https://github.com/hokwaichan.png"
              alt="Hok Wai Chan"
              className="w-11 h-11 rounded-full"
              width="44"
              height="44"
            />
            <div>
              <span className="font-semibold">Hok Wai Chan</span>
              <br />
              <a
                href="https://hokwaichan.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 underline"
              >
                GitHub Profile
              </a>
            </div>
          </li>
        </ul>
      </>
    ),
  },
];
const InfoBox = () => {
  const [currentContent, setCurrentContent] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNextContent = () =>
    setCurrentContent((prev) => Math.min(prev + 1, contentData.length));
  const handlePreviousContent = () =>
    setCurrentContent((prev) => Math.max(prev - 1, 1));

  const { title, content } = contentData[currentContent - 1];

  if (!isOpen) {
    return (
      <button
        className="absolute top-[200px] bg-black/70 backdrop-blur-lg border border-slate-700 rounded-full p-3"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Info className="w-6 h-6 text-slate-300" />
      </button>
    );
  }

  return (
    <div className="mt-12 bg-black/70 backdrop-blur-lg text-white shadow-lg rounded-lg p-4 w-[360px] h-[300px] border border-gray-800 flex flex-col relative">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute bg-slate-800 -right-2 -top-2 p-1 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>
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
