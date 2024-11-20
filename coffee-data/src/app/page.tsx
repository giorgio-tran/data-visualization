"use client";

import { useState, useEffect } from "react";
import GlobeComponent from "./componment/globe";
import ActionButtons from "./componment/actionButtons";
import BarChart from "./componment/barChart";
import Heading from "./componment/heading";
import CountryDropdown from "./componment/countryDropdown";
import LineChart from "@/app/componment/lineChart";
import { CoffeeDataFeatures, CoffeeDataFeature } from "./types/coffee_data";

const MainPage = () => {
  const [category, setCategory] = useState<
    "coffee_imports" | "coffee_exports" | "coffee_production"
  >("coffee_imports");
  const [countries, setCountries] = useState<Partial<CoffeeDataFeatures>>({
    features: [],
  });
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [year, setYear] = useState<string>("2019");

  useEffect(() => {
    // load data from the local file in the public directory
    fetch("/data/coffee_data.geojson")
      .then((res) => res.json())
      .then((countries) => {
        setCountries({
          features: countries.features.filter(
            (item: CoffeeDataFeature) => item.properties[category]
          ),
        });
      });
  }, [category, year]);

  console.log("countries", countries);

  return (
    <div className="w-full h-screen">
      <div className="absolute z-10 top-0 m-4">
        <Heading title="Coffee Dataset Visualization" />
      </div>
      <div className="absolute z-10 m-4 bottom-0">
        <CountryDropdown
          category={category}
          year="2019"
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          countries={countries.features as CoffeeDataFeature[]}
        />
      </div>
      <GlobeComponent category={category} year="2019" countries={countries} />
      <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 m-4">
        <ActionButtons onCategoryChange={setCategory} />
      </div>
      <div className="absolute z-10 right-0 top-0 m-4 bg-none">
        <div className="w-[500px] h-[300px] bg-black/60 backdrop-blur-lg rounded-xl border border-gray-800">
          <BarChart year="1990" type="Import" />
        </div>
        <div className="w-[500px] h-[300px] bg-black/60 backdrop-blur-lg rounded-xl mt-2 border border-gray-800">
          <LineChart country="Austria" type="Import"></LineChart>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
