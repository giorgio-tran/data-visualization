'use client';

import { useState } from 'react';
import GlobeComponent from './componment/globe';
import ActionButtons from './componment/actionButtons';
import BarChart from './componment/barChart';
import Heading from './componment/heading';
import CountryDropdown from './componment/countryDropdown';
import LineChart from "@/app/componment/lineChart";

const MainPage = () => {
  const [category, setCategory] = useState<'coffee_imports' | 'coffee_exports' | 'coffee_production'>('coffee_imports');

  return (
    <div className="relative w-full h-screen p-4 space-y-6">
      <Heading title="Coffee Dataset Visualization" />
      <CountryDropdown category={category} year="2019" />
      <GlobeComponent category={category} year="2019" />
      <ActionButtons onCategoryChange={setCategory} />
      <div className="flex justify-between">
          <div className="w-3/5">
          <BarChart year="1990" type="Import" />
          </div>
          <div className="w-2/5">
          <LineChart country="Austria" type="Import"></LineChart>
          </div>
      </div>
    </div>
  );
};

export default MainPage;