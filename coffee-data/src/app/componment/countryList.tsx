'use client'

import React from "react";

export default function CountryList({ items, selectedItem, handleSelect }) {
    return (
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
    );
}