"use client";

import { useState, useEffect } from "react";
import GlobeComponent from "./componment/globe";
import ActionButtons from "./componment/actionButtons";
import BarChart from "./componment/barChart";
import Heading from "./componment/heading";
import CountryDropdown from "./componment/countryDropdown";
import LineChart from "@/app/componment/lineChart";
import { CoffeeDataFeatures, CoffeeDataFeature } from "./types/coffee_data";
import { dynamicLabel } from "./constants/constants";

const MainPage = () => {
  const [category, setCategory] = useState<
    "coffee_imports" | "coffee_exports" | "coffee_production"
  >("coffee_imports");
  const [countries, setCountries] = useState<Partial<CoffeeDataFeatures>>({
    features: [],
  });
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [year, setYear] = useState<string>("2019");
  // const year = "2019"; // here for now to deploy

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

  return (
    <div className="w-full h-screen">
      <div className="absolute z-10 top-0 m-4 text-white">
        <Heading title="Coffee Dataset Visualization" />
      </div>
      <div className="absolute z-10 m-4 bottom-0">
        <div className="flex flex-col gap-6 justify-between bg-black/70 backdrop-blur-xl border border-gray-800 rounded-lg p-4">
          <CountryDropdown
            category={category}
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
            countries={countries.features as CoffeeDataFeature[]}
          />
          <div className="w-[300px] text-sm">
            <div className="flex justify-between text-white">
              <span>1990</span>
              <span>2019</span>
            </div>
            <input
              type="range"
              min="0"
              max="29"
              step="1"
              className="cursor-pointer w-full accent-purple-700"
              onChange={(e) => {
                setYear((parseInt(e.target.value) + 1990).toString());
              }}
              value={(parseInt(year) - 1990).toString()}
            />
            <div className="self-center">
              <span className="font-bold text-white">Year: {year}</span>
            </div>
          </div>
          <div className="w-full">
            <ActionButtons onCategoryChange={setCategory} category={category} />
          </div>
        </div>
      </div>
      <GlobeComponent category={category} year={year} countries={countries} />
      <div className="absolute z-10 right-0 top-0 m-4 bg-none">
        <div className="w-[500px] h-[300px] bg-black/70 backdrop-blur-lg rounded-xl border border-gray-800">
          <BarChart year={year} type={dynamicLabel[category]} />
        </div>
      </div>

      {selectedCountry && (
        <LineChart
          countries={countries.features as CoffeeDataFeature[]}
          country={selectedCountry}
          type={category}
          year={year}
        ></LineChart>
      )}
    </div>
  );
};

export default MainPage;
