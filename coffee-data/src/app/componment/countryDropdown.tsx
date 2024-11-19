"use client";

import { useState, useEffect } from "react";
import { CoffeeDataFeature } from "../types/coffee_data";

type CountryDropdownProps = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  year: string;
};

const CountryDropdown = ({ category, year }: CountryDropdownProps) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("/data/coffee_data.geojson")
      .then((res) => res.json())
      .then((data) => {
        const filteredCountries = data.features
          .filter(
            (item: CoffeeDataFeature) => item.properties[category]?.[year]
          )
          .map((item: CoffeeDataFeature) => item.properties.NAME_LONG);

        setCountries(filteredCountries);
        setSelectedCountry(filteredCountries[0] || "");
      });
  }, [category, year]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    console.log(`Selected country: ${e.target.value}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Select a Country ({category.replace("coffee_", "").toUpperCase()})
      </label>
      <select
        id="country"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedCountry}
        onChange={handleChange}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <p className="mt-2 text-sm text-gray-600">
          Selected Country:{" "}
          <span className="font-medium">{selectedCountry}</span>
        </p>
      )}
    </div>
  );
};

export default CountryDropdown;
