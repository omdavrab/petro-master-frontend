import React, { useState } from 'react'
import dynamic from "next/dynamic";
import { useTheme } from 'next-themes';
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const DasboardChart = () => {
    const { systemTheme, theme, setTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    const options = {
        chart: {
            background: '',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                }
            }
        },
        theme: {
            mode: `${theme}`, 
            palette: 'palette0', 
            monochrome: {
                enabled: true,
                color: '#f38c10',
                // shadeTo: 'dark',
                // shadeIntensity: 0.65
            },
        },
        xaxis: {
            categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        },

        grid: {
            show: false,
            strokeDashArray: 5,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },

        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: "40px",
            },
        },
    };
    const series = [
        {
            name: "series-1",
            data: [30, 40, 25, 50, 49, 21, 70, 51]
        },

    ];
    return (

        <ReactApexChart
            options={options} series={series} type="area"
            height={350}
        />

    )
}

export default DasboardChart
