import {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

interface Country {
    country: string;
    total: string;
    dataInYear: string;
}

const LineChart = ({country, type}: { country: string, type: string }) => {
    const [chartData, setChartData] = useState<any>(null);
    const [years, setYears] = useState<string[]>([]);
    const Country = "Austria";
    let url = "";
    if (type === "Import") {
        url = "/data/Coffee_import.json";
    } else if (type === "Export") {
        url = "/data/coffee_export.json";
    } else {
        url = "/data/Coffee_production.json";
    }
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((items: any) => {
                const data = items.find((item: any) => item.Country.trim() === country);
                if (data) {
                    setChartData(data);
                    // Get the list of years (keys) excluding 'Country' and 'Total_import'
                    const yearsList = Object.keys(data).filter(
                        (key) => key !== "Country" && key !== "Total_import"
                    );
                    setYears(yearsList);
                } else {
                    console.error(`Country "${Country}" not found in the data.`);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [Country]);

    if (!chartData) {
        return <div>Loading...</div>;
    }
    const data = {
        labels: years,
        datasets: [
            {
                label: `Coffee ${type} Data for ${country}`,
                data: years.map((year) => parseInt(chartData[year])),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                pointRadius: 5,
                pointBackgroundColor: "rgb(75, 192, 192)",
            },
        ],
    };

    const options = {
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

    return (
        <Line data={data} options={options}/>
    );
};

export default LineChart;
