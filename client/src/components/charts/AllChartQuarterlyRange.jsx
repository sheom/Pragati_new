import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const AllChartQuarterlyRange = ({ title, subTitle, series, options, type, colors, categories, startWith, endWith }) => {
    // console.log("series")
    // console.log(series)

    series = series.filter((s)=>{
        return ( !isNaN(s.data[0]) )
    })
    // console.log("series After Check")
    // console.log(series)

    const {palette} = useTheme();
    if(!type){
        type = "line"
    }
    /*
    line
    area
    bar
    radar
    histogram
    pie
    donut
    radialBar
    scatter
    bubble
    heatmap
    candlestick

    */

    return (
        <Box
            // id="chart"
            // flex={1}
             //display="flex"
             bgcolor= "#ffffff"
             flexDirection="column"
             justifyContent="space-between"
             alignItems="center"
            // pl={3.5}
            // py={2}
             //gap={2}
            //borderRadius="15px"
            //border="1px solid"
            // minHeight="110px"
            // width="100%"
        >
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={16} color="#808191">
                    {title}
                </Typography>
            </Stack>

            <ReactApexChart
                options={{
                    chart: { 
                        type: {type},
                        zoom: {
                            enabled: false
                        }
                    },
                    xaxis: {
                        categories: categories?categories : ["Q1", "Q2", "Q3", "Q4" ]
                    },
                    yaxis: {
                        // title: {
                        //     text: 'Scale of 1 to 5',
                        //     fontSize: '8px',
                        //   },
                        //min: startWith?startWith:'',
                        //max: 30000,
                        labels: {
                          /**
                          * Allows users to apply a custom formatter function to yaxis labels.
                          *
                          * @param { String } value - The generated value of the y-axis tick
                          * @param { index } index of the tick / currently executing iteration in yaxis labels array
                          */
                          formatter: function(val, index) {
                            return (val%1 !== 0) ? val.toFixed(1):val //val
                            //return Math.round(val);
                          }
                        }
                      },
                    //colors: ['#2E93fA', '#66DA26', '#546E7A'],
                    legend: { 
                        show: true,
                        fontSize: '10px',
                        markers: {
                            //width: 12,
                           // height: 12,
                            //strokeWidth: 0,
                            //strokeColor: '#fff',
                            //fillColors: undefined,
                            radius: 0,
                            //customHTML: "undefined",
                            //onClick: undefined,
                            //offsetX: 0,
                            //offsetY: 0
                        },
                     },
                    dataLabels: {
                        name: {
                            fontSize: '8px',
                          },
                          value: {
                            fontSize: '8px',
                          },
                           enabled: false 
                        },
                    zoom: {
                        enabled: false
                    },
                    stroke: {
                        width: 2
                    },
                    plotOptions: {
                        bar: {
                          //borderRadius: 4,
                          horizontal: false,
                        }
                      },
                }}
                series={series}
                type={type}
                width="90%"
                height="190"
            />
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={12} color="#808191">
                    {subTitle}
                </Typography>
            </Stack>
        </Box>
    );
};

export default AllChartQuarterlyRange;
