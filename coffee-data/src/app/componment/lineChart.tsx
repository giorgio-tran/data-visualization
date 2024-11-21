import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { CoffeeDataFeature, CoffeeLogistics } from "../types/coffee_data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  country,
  type,
  countries,
}: {
  country: string;
  type: "coffee_imports" | "coffee_exports" | "coffee_production";
  countries: CoffeeDataFeature[];
}) => {
  // let url = "";
  // if (type === "Import") {
  //   url = "/data/Coffee_import.json";
  // } else if (type === "Export") {
  //   url = "/data/coffee_export.json";
  // } else {
  //   url = "/data/Coffee_production.json";
  // }
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((items: CoffeeLogistics[]) => {
  //       const data = items.find(
  //         (item: CoffeeLogistics) => item.Country.trim() === country
  //       );
  //       if (data) {
  //         setChartData(data);
  //         // Get the list of years (keys) excluding 'Country' and 'Total_import'
  //         const yearsList = Object.keys(data).filter(
  //           (key) => key !== "Country" && key !== "Total_import"
  //         );
  //         setYears(yearsList);
  //       } else {
  //         console.error(`Country "${country}" not found in the data.`);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, [country, url, type]);

  const filteredCountry = countries?.filter(
    (d) => d.properties.NAME_LONG === country
  )[0]?.properties[type];

  const years = Object.keys(filteredCountry)?.filter(
    (d) =>
      d !== "Country" &&
      d !== "Total_import" &&
      d !== "Total_export" &&
      d !== "Total_production"
  );

  const data = {
    labels: years,
    datasets: [
      {
        label: `Coffee ${type} Data for ${country}`,
        data: years.map((year) => {
          if (parseFloat(filteredCountry[year]) < 0) {
            return null;
          }
          return parseFloat(filteredCountry[year]);
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Coffee ${type} Over Time`,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Amount (kg)",
        },
        ticks: {
          callback: function (value: string | number) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
