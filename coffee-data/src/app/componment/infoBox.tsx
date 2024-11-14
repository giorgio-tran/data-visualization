'use client'

import React from "react";

export default function InfoBox() {
    return (
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-40 h-48">
            <h3 className="text-lg font-semibold">General Info</h3>
            <p className="text-sm text-gray-700 mt-2">
                Description of what is an importer
            </p>
        </div>
    );
}
