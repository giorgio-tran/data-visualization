"use client";

import { useState, useEffect } from "react";
import {
  CoffeeDataFeature,
  CoffeeDataFeatures,
  CoffeeLogistics,
} from "../types/coffee_data";

type CountryDropdownProps = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  year: string;
  setSelectedCountry: (country: string) => void;
  selectedCountry: string;
  countries: CoffeeDataFeature[];
};

const CountryDropdown = ({
  category,
  setSelectedCountry,
  selectedCountry,
  countries,
}: CountryDropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    console.log(`Selected country: ${e.target.value}`);
  };

  console.log("countries", countries);

  if (!countries) {
    return <></>;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <label htmlFor="country" className="block text-sm font-medium text-white">
        Select a Country ({category.replace("coffee_", "").toUpperCase()})
      </label>
      <select
        id="country"
        className="mt-1 block w-full p-2 border border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black/70 text-white"
        value={selectedCountry}
        onChange={handleChange}
      >
        {(countries as CoffeeDataFeature[]).map((country) => (
          <option
            key={country.properties.NAME_LONG}
            value={country.properties.NAME_LONG}
          >
            {country.properties.NAME_LONG}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
