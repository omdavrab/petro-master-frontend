import React, { useState } from 'react'
import dynamic from "next/dynamic";
import { useTheme } from 'next-themes';

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
const CustomerFlow = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const options =  {
        chart: {
            background: '',
            type: 'bar',
            height: 350,
     
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
        colors: [
            function ({ value, seriesIndex, dataPointIndex, w }) {
                if (dataPointIndex % 2 === 0) {
                    return "#ffb500";
                } else {
                    return "#7e7e7e";
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }
    const series = [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }]
    
    return (
        <ReactApexChart options={options} series={series} type="bar" height={350} />

    )
}

export default CustomerFlow
