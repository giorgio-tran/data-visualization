'use client' 

import React, { useState } from "react";
import GlobeComponent from "./componment/globe";

export default function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const items = ["Country 1", "Country 2", "Country 3", "Country 4", "Country 5"];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        setMenuOpen(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full h-[800px] overflow-hidden relative">
                <div className="mt-4 text-center">
                    <h2 className="text-2xl font-semibold">Coffee Visualization</h2>
                </div>

                <div className="flex justify-center items-center w-full mt-4">
                    <div className="container w-96 h-96 overflow-hidden rounded-full flex justify-center items-center">
                        <GlobeComponent />
                    </div>
                </div>

                {/* Description Card inside main card with reduced width */}
                <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-40 h-48">
                    <h3 className="text-lg font-semibold">General Info</h3>
                    <p className="text-sm text-gray-700 mt-2">
                        Description of what is an importer
                    </p>
                </div>

                {/* Toggleable Scrollable Menu at the Left-Bottom Corner */}
                <div className="absolute bottom-4 left-4">
                    <button
                        onClick={toggleMenu}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        {menuOpen ? "Close" : "Country"}
                    </button>

                    {menuOpen && (
                        <div className="bg-white shadow-lg rounded-lg mt-2 p-4 w-48 h-48 overflow-y-auto">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className={`p-2 cursor-pointer rounded ${
                                        selectedItem === item
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Import
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Export
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Produced
                    </button>
                </div>
            </div>
        </div>
    );
}
