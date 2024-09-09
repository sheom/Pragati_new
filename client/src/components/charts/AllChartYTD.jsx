import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
//import { useTheme } from "@emotion/react";

const AllChartYTD = ({ title, series, options, type, colors, categories }) => {
    //const {palette} = useTheme();
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
             bgcolor= "#ffffff"
             flexDirection="row"
             justifyContent="center"
             alignItems="center"
             alignContent="center"
             
             //height={"100%"}
        >
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191" align="center">
                    {title}
                </Typography>
            

            <ReactApexChart
                options={{
                    chart: { 
                        type: {type},
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    xaxis: {
                        //categories: ["Budget", "YTD Actual" ]
                        categories: categories? categories : ["ALOS" ]
                    },
                    yaxis: {
                        labels: {
                          /**
                          * Allows users to apply a custom formatter function to yaxis labels.
                          *
                          * @param { String } value - The generated value of the y-axis tick
                          * @param { index } index of the tick / currently executing iteration in yaxis labels array
                          */
                          formatter: function(val, index) {
                            return (val%1 !== 0) ? val.toFixed(1):val //val
                            //return val.toFixed(1);
                            //return val;
                          }
                        }
                      },
                    colors: colors? colors : ['#2E93fA', '#66DA26'],
                    
                    legend: { 
                        show: true,
                        fontSize: '10px',
                        markers: {
                            radius: 0,
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
                          horizontal: false,
                        }
                      },
                }}
                series={series}
                type={type}
                width="70%"
                height="250"
            />
</Stack>
        </Box>
    );
};

export default AllChartYTD;
