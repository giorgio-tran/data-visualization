'use client';

import GlobeComponent from './componment/globe';
import ActionButtons from './componment/actionButtons';
import BarChart from './componment/barChart';
import Heading from './componment/heading';
import CountryDropdown from './componment/countryDropdown';

const MainPage = () => {

  return (
    <div className="relative w-full h-screen p-4 space-y-6">
      <Heading title="Coffee Dataset Visualization" />
      <CountryDropdown category="coffee_imports" year="2019" />
      <GlobeComponent category="coffee_imports" year="2019" />
      <ActionButtons />
      <BarChart year="1990" type="Import" />
    </div>
  );
};

export default MainPage;