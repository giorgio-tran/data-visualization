import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface Country {
    country: string;
    total: string;
    dataInYear: string;
}

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

const BarChart = ({year, type}: { year: string, type: string }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    let url = "";
    if (type === "Import") {
        url = "/data/Coffee_import.json";
    } else if (type === "Export") {
        url = "/data/coffee_export.json";
    } else {
        url = "/data/Coffee_production.json";
    }

    const data = {
        labels: countries.map((country) => country.country),
        datasets: [
            {
                label: `Coffee ${type} Data in ${year}`,
                data: countries.map((country) => parseInt(country.dataInYear)),
                backgroundColor: generateColors(countries.length),
                borderColor: countries.map(() => 'rgba(0, 0, 0, 0.3)'),
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((items) => {
                const filteredData: Country[] = items
                    .filter((item: any) => item[year] > 0)
                    .map((item: any) => {
                        return {
                            country: item.Country,
                            dataInYear: item[year],
                        };
                    });
                setCountries(filteredData);
                console.log(filteredData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [year]);

    const options = {
        responsive: true,
        indexAxis: 'y',
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
                    autoSkip: true,
                },
            },
        },
    };

    return (
        <Bar data={data} options={options}/>
    );
};

export default BarChart;
