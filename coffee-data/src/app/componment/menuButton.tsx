'use client'

import React from "react";

export default function MenuButton({ menuOpen, toggleMenu }) {
    return (
        <button
            onClick={toggleMenu}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
            {menuOpen ? "Close" : "Country"}
        </button>
    );
}