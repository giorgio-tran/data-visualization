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
} from "chart.js";
import { CoffeeDataFeature } from "../types/coffee_data";

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
        label: `Coffee ${type} Data for ${country}`,
        data: years?.map((year) => {
          if (parseFloat(filteredCountry[year]) < 0) {
            return null;
          }
          return parseFloat(filteredCountry[year]);
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        pointRadius: 5,
        // pointBackgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  function specialYearColor(ctx: any) {
    console.log("ctx", ctx);
    const index = ctx.dataIndex;
    console.log("index", years?.[index]);
    return years?.[index] === year ? "red" : "rgb(75, 192, 192)";
  }

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
    elements: {
      point: {
        backgroundColor: specialYearColor,
        borderColor: specialYearColor,
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

  return (
    filteredCountry && (
      <div className="absolute z-100 right-0 bottom-0 m-4 bg-none">
        <div className="w-[500px] h-[300px] bg-black/60 backdrop-blur-lg rounded-xl mt-2 border border-gray-800">
          <Line data={data as ChartData<"line">} options={options} />
        </div>
      </div>
    )
  );
};

export default LineChart;
