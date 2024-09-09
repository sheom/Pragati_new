import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const StackedChart = ({ title, series, options, type, colors }) => {
    if(!type){
        type = "line"
    }

    return (
        <Box
             bgcolor= "#ffffff"
             flexDirection="column"
             justifyContent="space-between"
             alignItems="center"
        >
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191">
                    {title}
                </Typography>
            </Stack>

            <ReactApexChart
                options={{
                    chart: { 
                        type: {type},
                        stacked: true,
                        zoom: {
                            enabled: false
                        }
                    },
                    xaxis: {
                        categories: ["Apr",	"May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"]
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

                    legend: { 
                        show: true,
                        fontSize: '10px',
                        markers: {
                            radius: 0,
                        },
                     },
                    dataLabels: {
                        name: {
                            fontSize: '2px',
                          },
                          value: {
                            fontSize: '2px',
                          },
                           enabled: true 
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
                            borderRadius: 1,
                            dataLabels: {
                              total: {
                                enabled: false,
                                style: {
                                  fontSize: '2px',
                                  //fontWeight: 200
                                },
                                formatter: function(val, index) {
                                    //return (val%1 !== 0) ? val.toFixed(1):val //val
                                    return val.toFixed(1);
                                    //return val;
                                  }
                              }
                            }
                          },
                      },
                }}
                series={series}
                type={type}
                width="100%"
                height="250px"
                foreColor= '#373d3f'
            />
        </Box>
    );
};

export default StackedChart;
