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
import { Slider } from "@nextui-org/slider";

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
        <div className="flex flex-col text-5xl font-bold gap-4">
          <div>A History of Coffee</div>
          <div className="text-4xl">From 1990 to 2019</div>
        </div>
      </div>
      <div className="absolute z-10 m-4 bottom-0">
        <div className="flex flex-col gap-6 justify-between bg-black/70 backdrop-blur-xl border border-gray-800 rounded-lg p-4">
          <CountryDropdown
            category={category}
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
            countries={countries.features as CoffeeDataFeature[]}
          />
          <Slider
            label="Select a Year:"
            step={1}
            maxValue={2019}
            minValue={1990}
            defaultValue={2019}
            showSteps={true}
            showTooltip={true}
            showOutline={true}
            disableThumbScale={true}
            formatOptions={{ useGrouping: false }}
            tooltipValueFormatOptions={{ useGrouping: false }}
            onChange={(value) => {
              setYear(value.toString());
              console.log(year);
            }}
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
              labelWrapper: "mb-2",
              label: "font-small text-default-700 text-small text-white",
              value: "font-medium text-default-500 text-small text-white",
              thumb: [
                "transition-size",
                "bg-gradient-to-r from-secondary-400 to-primary-500",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
              ],
              step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
            }}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                ],
              },
            }}
          />
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
