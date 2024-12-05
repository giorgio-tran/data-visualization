import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CoffeeDataFeatures } from "../types/coffee_data";
import { dynamicLabel } from "@/app/constants/constants";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface Country {
  country: string;
  dataInYear: number;
}
type CoffeeDataType = "coffee_imports" | "coffee_exports" | "coffee_production";

// Function to generate a range of colors
const generateColors = (numColors: number): string[] => {
  const colors = [];
  const hueIncrement = 360 / numColors;
  for (let i = 0; i < numColors; i++) {
    const hue = i * hueIncrement;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

const BarChart = ({ year, type }: { year: string; type: CoffeeDataType }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  const url = "/data/coffee_data.geojson";
  const formatYear = (year: string) => {
    const nextYear = parseInt(year.toString(), 10) + 1;
    return `${year}/${nextYear.toString().slice(-2)}`;
  };
  const data = {
    labels: countries.map((country) => country.country),
    datasets: [
      {
        label: `Coffee ${dynamicLabel[type]} Data in ${year}`,
        data: countries.map((country) => country.dataInYear),
        backgroundColor: generateColors(countries.length),
        borderColor: countries.map(() => "rgba(0, 0, 0, 0.3)"),
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    const fetchYear = type === "coffee_production" ? formatYear(year) : year;
    fetch(url)
      .then((res) => res.json())
      .then((items: CoffeeDataFeatures) => {
        const filteredData: Country[] = items.features
          .map((feature) => {
            const data = feature.properties[type];
            if (data && data[fetchYear] !== undefined) {
              return {
                country: data.Country,
                dataInYear: parseInt(data[fetchYear]) || 0, // Parse as number, default to 0 if invalid
              };
            } else {
              return null; // Skip if no coffee_imports data
            }
          })
          .filter((item) => item !== null)
          .sort((a: Country, b: Country) => b.dataInYear - a.dataInYear)
          .slice(0, 10);
        setCountries(filteredData);
        console.log(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [year, type]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Hides the grid on the x-axis
        },
        ticks: {
          callback: function (value: string | number) {
            return value.toLocaleString();
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Hides the grid on the y-axis
        },
        ticks: {
          padding: 10,
          autoSkip: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
