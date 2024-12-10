"use client";

import { useState, useEffect, useRef } from "react";
import GlobeComponent from "./components/globe";
import ActionButtons from "./components/actionButtons";
import BarChart from "./components/barChart";
import CountryDropdown from "./components/countryDropdown";
import LineChart from "@/app/components/lineChart";
import { CoffeeDataFeatures, CoffeeDataFeature } from "./types/coffee_data";
// import { dynamicLabel } from "./constants/constants";
import { Slider } from "@nextui-org/slider";
import { GlobeMethods } from "react-globe.gl";
import InfoBox from "./components/infoBox";

const MainPage = () => {
  const [category, setCategory] = useState<
    "coffee_imports" | "coffee_exports" | "coffee_production"
  >("coffee_imports");
  const [countries, setCountries] = useState<Partial<CoffeeDataFeatures>>({
    features: [],
  });
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isChartClosed, setIsChartClosed] = useState(false);
  const [year, setYear] = useState<string>("2019");
  // const year = "2019"; // here for now to deploy

  const handleSelectedCountry = (country: string) => {
    setIsChartClosed(false);
    setSelectedCountry(country);
  };

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

  const globeRef = useRef<GlobeMethods | undefined>();

  useEffect(() => {
    if (selectedCountry && globeRef.current && countries.features) {
      const country = countries.features.find(
        (item: CoffeeDataFeature) =>
          item.properties.NAME_LONG === selectedCountry
      );
      if (country) {
        globeRef.current.pointOfView(
          {
            lat: (country.bbox[3] + country.bbox[1]) / 2,
            lng: (country.bbox[2] + country.bbox[0]) / 2,
            altitude: 1.5,
          },
          1000
        );
      }
    }
  }, [selectedCountry]);

  return (
    <div className="w-full h-screen">
      <div className="absolute z-10 top-0 m-4 text-white">
        <div className="flex flex-col text-5xl font-bold gap-2 text-outline">
          <div>A History of Coffee</div>
          <div className="text-4xl">From 1990 to 2019</div>
        </div>
        <InfoBox />
      </div>
      <div className="absolute z-10 m-4 bottom-0">
        <div className="flex flex-col gap-6 justify-between bg-black/70 backdrop-blur-xl border border-gray-800 rounded-lg p-4 w-80">
          <CountryDropdown
            category={category}
            setSelectedCountry={handleSelectedCountry}
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
          {/* <button
            onClick={() => {
              if (globeRef.current) {
                console.log(countries?.features[0]);
                globeRef.current.pointOfView(
                  {
                    lat: countries?.features[0]?.geometry.coordinates[0][0][1],
                    lng: countries?.features[0]?.geometry.coordinates[0][0][0],
                    altitude: 0.2,
                  },
                  1000
                );
              }
            }}
          >
            CLICK ME
          </button> */}
        </div>
      </div>
      <GlobeComponent
        globeRef={globeRef}
        category={category}
        year={year}
        countries={countries}
        handleCountry={handleSelectedCountry}
        selectedCountry={selectedCountry}
      />
      <div className="absolute z-10 right-0 top-0 m-4 bg-none">
        <div className="w-[500px] h-[300px] bg-black/70 backdrop-blur-lg rounded-xl border border-gray-800">
          <BarChart year={year} type={category} />
        </div>
      </div>
      {selectedCountry && !isChartClosed && (
        <LineChart
          countries={countries.features as CoffeeDataFeature[]}
          country={selectedCountry}
          type={category}
          year={year}
          onClose={() => setIsChartClosed(true)} // Pass a handler to close the chart
        />
      )}
    </div>
  );
};

export default MainPage;
