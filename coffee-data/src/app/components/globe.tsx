"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import * as d3 from "d3";
import { CoffeeDataFeature, CoffeeDataFeatures } from "../types/coffee_data";
// import GlobeWrapped from "./GlobeWrapped";
import dynamic from "next/dynamic";
import { GlobeMethods } from "react-globe.gl";

type GlobeComponentProps = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  year: string;
  countries: Partial<CoffeeDataFeatures>;
  handleCountry: (country: string) => void;
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  selectedCountry: string;
};

const standardizeYear = (year: string): string => {
  const match = year.match(/^(\d{4})/);
  return match ? match[1] : year;
};

const getMatchingYearKey = (
  data: Record<string, string>,
  targetYear: string
): string | null => {
  if (data[targetYear]) return targetYear;
  return Object.keys(data).find((key) => key.startsWith(targetYear)) || null;
};

const GlobeWrapped = dynamic(() => import("./GlobeWrapped"), {
  ssr: false,
});

export default function GlobeComponent(props: GlobeComponentProps) {
  const [countries, setCountries] = useState<Partial<CoffeeDataFeatures>>({
    features: [],
  });
  const [hoverD, setHoverD] = useState<object | null>();

  const { category, year } = props;

  const parentRef = useRef<HTMLDivElement>(null);

  const dynamicLabel = {
    coffee_imports: "Import",
    coffee_exports: "Export",
    coffee_production: "Production",
  };

  useEffect(() => {
    // load data from the local file in the public directory
    fetch("/data/coffee_data.geojson")
      .then((res) => res.json())
      .then((data) => {
        setCountries({
          features: data.features.filter(
            (item: CoffeeDataFeature) => item.properties[category]
          ),
        });
      });
  }, [category]);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrBr);

  const getVal = useCallback(
    (feat: CoffeeDataFeature) => {
      const data = feat.properties[category];
      if (!data) return 0;

      const targetYear =
        category === "coffee_production" ? standardizeYear(year) : year;

      const yearKey = getMatchingYearKey(data, targetYear);
      if (!yearKey) return 0;

      const value = parseFloat(data[yearKey]);
      return value || 0;
    },
    [category, year]
  );

  // Find the max value to scale the color range
  const maxVal = useMemo(
    () => Math.max(...(countries.features?.map(getVal) || [0])),
    [countries, getVal]
  );

  colorScale.domain([0, maxVal]);

  if (countries.features?.length === 0) {
    return (
      <div className="w-screen h-screen absolute overflow-hidden z-50 bg-black flex flex-col items-center justify-center gap-2">
        {/* Loading globe... */}
        <img src="/pedro.gif" />
        <div className="font-bold italic">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden" ref={parentRef}>
      <GlobeWrapped
        forwardRef={props.globeRef}
        // width={width}
        // height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={countries.features}
        polygonAltitude={(d) => {
          // console.log("d", d);
          const data = d as CoffeeDataFeature;
          return data.properties.NAME_LONG === props.selectedCountry ||
            data === hoverD
            ? 0.2
            : 0.01;
        }}
        polygonCapColor={(d) =>
          d === hoverD
            ? "steelblue"
            : colorScale(getVal(d as CoffeeDataFeature))
        }
        polygonSideColor={() => "rgba(0, 100, 0, 0.3)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(d: object) => {
          const data = d as CoffeeDataFeature; // Assert that `d` is `CoffeeDataFeature`

          const coffeeType =
            category === "coffee_production"
              ? data.properties[category]?.["Coffee type"] || "Unknown"
              : "";

          return `
              <div id="polygon-label-parent">
                <div id="polygon-label-background"></div>
                <div id="polygon-label-text">
                  <b>${data.properties.NAME_LONG}</b> <br />
                  Coffee ${dynamicLabel[category]}: ${getVal(
            data
          ).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })} kg<br/>
                  ${
                    category === "coffee_production"
                      ? `Coffee Type: <i>${coffeeType}</i><br/>`
                      : ""
                  }
                </div>
              </div>
            `;
        }}
        onPolygonClick={(d) => {
          props.handleCountry((d as CoffeeDataFeature).properties.NAME_LONG);
        }}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}
