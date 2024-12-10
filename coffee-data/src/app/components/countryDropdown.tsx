"use client";

import { useState } from "react";
import { CoffeeDataFeature } from "../types/coffee_data";

type CountryDropdownProps = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  setSelectedCountry: (country: string) => void;
  selectedCountry: string;
  countries: CoffeeDataFeature[];
};

const CountryDropdown = ({
  setSelectedCountry,
  selectedCountry,
  countries,
}: CountryDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const filteredCountries = countries.filter((country) =>
    country.properties.NAME_LONG.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleSelection = (value: string) => {
    setSelectedCountry(value);
    setSearchTerm("");
    setIsDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  return (
    <div className="w-full max-w-sm relative">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-white mb-2"
      >
        Select a Country
      </label>
      <input
        autoComplete="off"
        type="text"
        id="country"
        className="mt-1 block w-full p-2 border border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-black/70 text-white"
        placeholder={selectedCountry || "Search for a country"}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {isDropdownVisible && filteredCountries.length > 0 && (
        <ul className="absolute bottom-full mt-3 w-full bg-black border border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto scrollbar-thin">
          {filteredCountries.map((country) => (
            <li
              key={country.properties.NAME_LONG}
              className="py-2 px-4 hover:bg-clr4 text-white w-full"
              onMouseDown={() => handleSelection(country.properties.NAME_LONG)}
            >
              {country.properties.NAME_LONG}
            </li>
          ))}
        </ul>
      )}

      {/* Message if no results */}
      {isDropdownVisible && filteredCountries.length === 0 && (
        <div className="absolute bottom-full mt-3 w-full bg-black/70 border bg-clr4 ring-indigo-500 border-indigo-500 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto text-center text-white py-2">
          No results found
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
