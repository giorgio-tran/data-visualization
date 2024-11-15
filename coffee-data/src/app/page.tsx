"use client";

import React, { useState } from "react";
import GlobeComponent from "./componment/globe";
import MenuButton from "./componment/menuButton";
import CountryList from "./componment/countryList";
import InfoBox from "./componment/infoBox";
import ActionButtons from "./componment/actionButtons";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = [
    "Country 1",
    "Country 2",
    "Country 3",
    "Country 4",
    "Country 5",
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleSelect = (item) => {
    setSelectedItem(item);
    setMenuOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full h-[800px] overflow-hidden relative">
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold">Coffee Visualization</h2>
        </div>

        <div className="flex justify-center items-center w-full mt-4">
          <div className="container w-96 h-96 overflow-hidden rounded-full flex justify-center items-center">
            <GlobeComponent category="coffee_production" year="2019/20" />
          </div>
        </div>

        <InfoBox />

        <div className="absolute bottom-4 left-4">
          <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          {menuOpen && (
            <CountryList
              items={items}
              selectedItem={selectedItem}
              handleSelect={handleSelect}
            />
          )}
        </div>

        <ActionButtons />
      </div>
    </div>
  );
}
