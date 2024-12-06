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
  ChartData,
  ScriptableContext,
} from "chart.js";
import { CoffeeDataFeature } from "../types/coffee_data";
import {  dynamicLabel  } from "@/app/constants/constants";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

type LineChartProps = {
  country: string;
  type: "coffee_imports" | "coffee_exports" | "coffee_production";
  countries: CoffeeDataFeature[];
  year: string;
};

const LineChart = ({ country, type, countries, year }: LineChartProps) => {
  const [isChartVisible, setIsChartVisible] = useState(true);

  const filteredCountry = countries?.filter(
      (d) => d.properties.NAME_LONG === country
  )[0]?.properties[type];

  useEffect(() => {
    if (filteredCountry && country) {
      setIsChartVisible(true);
    }
  }, [filteredCountry, country]);

  const years = filteredCountry
      ? Object.keys(filteredCountry).filter(
          (d) =>
              d !== "Country" &&
              d !== "Total_import" &&
              d !== "Total_export" &&
              d !== "Total_production"
      )
      : null;

  const data = {
    labels: years,
    datasets: [
      {
        label: `Coffee ${dynamicLabel[type]} Data for ${country}`,
        data: years?.map((year) => {
          if (parseFloat(filteredCountry[year]) < 0) {
            return null;
          }
          return parseFloat(filteredCountry[year]);
        }),
        fill: false,
        borderColor: "#7e22ce",
      },
    ],
  };

  function specialYearColor(ctx: ScriptableContext<"line">) {
    const index = ctx.dataIndex;
    return years?.[index] === year ? "yellow" : "#7e22ce";
  }

  function specialYearRadius(ctx: ScriptableContext<"line">) {
    const index = ctx.dataIndex;
    return years?.[index] === year ? 5 : 3;
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Coffee ${dynamicLabel[type]} Over Time`,
        color: "white",
      },
      tooltip: {
        mode: "index",
        titleColor: "white",
        intersect: false,
      },
    },
    elements: {
      point: {
        backgroundColor: specialYearColor,
        borderColor: specialYearColor,
        radius: specialYearRadius,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
          color: "white",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          color: "white",
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

  return (
      filteredCountry &&
      country && (
          <>
            <div className="absolute z-100 right-[250px] bottom-[305px] translate-x-1/2 m-4">
              <div className="text-2xl font-bold self-center text-center text-outline">{country}</div>
            </div>

            {isChartVisible && (
                <div className="absolute z-100 right-0 bottom-0 m-4 bg-none">
                  <div className="w-[500px] h-[300px] bg-black/60 backdrop-blur-lg rounded-xl mt-2 border border-gray-800 relative">
                    <button
                        onClick={() => setIsChartVisible(false)}
                        className="absolute top-2 right-2 text-white text-xl bg-transparent border-none cursor-pointer"
                        aria-label="Close chart"
                    >
                      X
                    </button>
                    <Line data={data as ChartData<"line">} options={options} />
                  </div>
                </div>
            )}
          </>
      )
  );
};

export default LineChart;
