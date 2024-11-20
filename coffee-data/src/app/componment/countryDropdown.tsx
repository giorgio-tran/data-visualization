"use client";

import { useState } from "react";
import { CoffeeDataFeature } from "../types/coffee_data";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSearchTerm(e.target.value);
    setIsDropdownVisible(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.properties.NAME_LONG.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

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
        Select a Country ({category.replace("coffee_", "").toUpperCase()})
      </label>

      <input
        type="text"
        id="country"
        className="mt-1 block w-full p-2 border border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-black/70 text-white"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {isDropdownVisible && (
        <div className="absolute bottom-full mt-2 w-full bg-black/70 border border-gray-800 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          <select
            className="w-full p-2 text-white bg-black/70 border-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            value={selectedCountry}
            onChange={handleChange}
            size={5}
          >
            <option value="" disabled>
              {searchTerm ? `Searching for: ${searchTerm}` : "Select a country"}
            </option>
            {filteredCountries.map((country) => (
              <option
                key={country.properties.NAME_LONG}
                value={country.properties.NAME_LONG}
                className="py-2"
              >
                {country.properties.NAME_LONG}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
