import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const StackedChartQuarterly = ({ title, series, options, type, colors, categories }) => {
    //console.log("series")
    //console.log(series)

    series = series.filter((s)=>{
        return ( !isNaN(s.data[0]) )
    })
    //console.log("series After Check")
    //console.log(series)

    const {palette} = useTheme();
    if(!type){
        type = "line"
    }


    return (
        <Box

             bgcolor= "#ffffff"
             flexDirection="column"
             justifyContent="space-between"
             alignItems="center"
             height={"100%"}
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
                        stacked: true,
                        zoom: {
                            enabled: false
                        }
                    },
                    xaxis: {
                        categories: categories?categories : ["Q1", "Q2", "Q3", "Q4" ]
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
                            //return val;
                          }
                        }
                      },
                    //colors: ['#2E93fA', '#66DA26', '#546E7A'],
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
                                  fontSize: '12px',
                                  fontWeight: 400
                                }
                              }
                            }
                          },
                      },
                }}
                series={series}
                type={type}
                width="90%"
                height="210"
            />
        </Box>
    );
};

export default StackedChartQuarterly;
