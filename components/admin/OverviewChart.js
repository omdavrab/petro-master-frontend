import React, { useState } from 'react'
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const OverviewChart = () => {
    const [state, setState] = useState({
        series: [{
            name: 'Net Profit',
            data: [44, 55, 50, 56, 61, 58, 63, 60, 66, 56, 61, 58, 63, 60, 66]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                
                toolbar: {
                    show: true,
                    tools: {
                        download: false // <== line to add
                    }
                }
            },
            grid: {
                show: false,      // you can either change hear to disable all grids

            },
            colors: "#6b7280",
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
                labels: {
                    show: false,
                },
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            },
            yaxis: {
                labels: {
                    show: false,
                },

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
        },
    })
    return (
        <ReactApexChart options={state.options} series={state.series} type="bar" height={200} />

    )
}

export default OverviewChart
