'use client'

import React from "react";

export default function ActionButtons() {
    return (
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
    );
}