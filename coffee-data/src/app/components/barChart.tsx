import React from "react";
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
import { CoffeeDataFeature } from "../types/coffee_data";
import { dynamicTitle } from "@/app/constants/constants";

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

const BarChart = ({
  year,
  type,
  countries,
}: {
  year: string;
  type: CoffeeDataType;
  countries: CoffeeDataFeature[];
}) => {
  // const url = "/data/coffee_data.geojson";
  const formatYear = (year: string) => {
    const nextYear = parseInt(year.toString(), 10) + 1;
    return `${year}/${nextYear.toString().slice(-2)}`;
  };

  const formattedYear = type === "coffee_production" ? formatYear(year) : year;

  const sortedCountries = countries
    .map((feature) => {
      const data = feature.properties[type];
      if (data && data[formattedYear] !== undefined) {
        return {
          country: data.Country,
          dataInYear: parseInt(data[formattedYear]) || 0, // Parse as number, default to 0 if invalid
        };
      } else {
        return null; // Skip if no coffee_imports data
      }
    })
    .filter((item) => item !== null)
    .sort((a: Country, b: Country) => b.dataInYear - a.dataInYear)
    .slice(0, 10);

  const data = {
    labels: sortedCountries.map((country) => country.country),
    datasets: [
      {
        label: `Top 10 ${dynamicTitle[type]} Countries in ${year}`,
        data: sortedCountries.map((country) => country.dataInYear),
        backgroundColor: generateColors(sortedCountries.length),
        borderColor: sortedCountries.map(() => "rgba(0, 0, 0, 0.3)"),
        borderWidth: 1,
      },
    ],
  };

  console.log("date", data);

  const options: ChartOptions<"bar"> = {
    animation: false,
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        border: {
          color: "gray",
        },
        grid: {
          drawOnChartArea: false,
          color: "gray",
          drawTicks: true,
        },
        ticks: {
          callback: function (value: string | number) {
            return value.toLocaleString();
          },
          // display: true,
          autoSkip: true,
          maxTicksLimit: 4,
          color: "white",
        },
        title: {
          display: true,
          color: "white",
          text: "Amount (kg)",
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
          color: "white",
        },
      },
    },
  };

  return (
    <div className="p-2">
      <div className="text-2xl font-bold self-center text-center text-outline text-white">
        Top 10 {dynamicTitle[type]} Countries in {year}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
