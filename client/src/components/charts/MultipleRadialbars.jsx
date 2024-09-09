// EBIDTA margin = (EBIDTA/TotalRevenue)*100

import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import TotalRevenue from "./TotalRevenue";

const MultipleRadialbars = ({ title, series, options, type, colors, total }) => {
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
    const chartData = {
          
        series: series?series: [8.96, 12.02, 14.01, 9.58],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '16px',
                },
                value: {
                  fontSize: '14px',
                },
                total: {
                  show: true,
                  label: 'Average',
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return total
                  }
                }
              }
            }
          },
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Total'],
        },
      
      
      };

    return (
        <Box
            // id="chart"
            // flex={1}
             //display="flex"
             bgcolor= "#ffffff"
             //flexDirection="column"
             //justifyContent="space-between"
            alignItems="center"
            // pl={3.5}
            // py={2}
            // gap={2}
               //borderRadius="15px"
               //border="1px solid"
            // minHeight="110px"
            // width="100%"
            height={"100%"}
        >
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191">
                    {title}
                </Typography>
            </Stack>

            {/* <ReactApexChart
                options={{
                    chart: { type: {type}},
                    xaxis: {
                        categories: ["Q1", "Q2", "Q3", "Q4" ]
                    },
                    colors,
                    legend: { show: true },
                    dataLabels: { enabled: false },
                    zoom: {
                        enabled: false
                    },
                    stroke: {
                        width: 2
                    },
                    plotOptions: {
                        bar: {
                          borderRadius: 4,
                          //horizontal: true,
                        }
                      },
                }}
                series={series}
                type={type}
                width="90%"
                height="150"
            /> */}


            <ReactApexChart 
                options={chartData.options} 
                series={chartData.series} 
                type="radialBar" 
                height={250} 
            />
    </Box>
    );
};

export default MultipleRadialbars;
