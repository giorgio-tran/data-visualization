'use client';

import React from 'react';

type ActionButtonsProps = {
  onCategoryChange: (category: 'coffee_imports' | 'coffee_exports' | 'coffee_production') => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCategoryChange }) => {
  return (
    <div className="mt-6 flex justify-center space-x-4">
      <button
        onClick={() => onCategoryChange('coffee_imports')}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Import
      </button>
      <button
        onClick={() => onCategoryChange('coffee_exports')}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Export
      </button>
      <button
        onClick={() => onCategoryChange('coffee_production')}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Produced
      </button>
    </div>
  );
};

export default ActionButtons;
