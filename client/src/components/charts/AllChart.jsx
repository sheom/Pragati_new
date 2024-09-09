import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const AllChart = ({ title, series, options, type, colors }) => {
    if(!type){
        type = "line"
    }

    return (
        <Box
            // id="chart"
            // flex={1}
             //display="flex"
             //bgcolor= {palette.neutral.light}
             bgcolor= "#ffffff"
             flexDirection="column"
             justifyContent="space-between"
             alignItems="center"
            // pl={3.5}
            // py={2}
            // gap={2}
               //borderRadius="15px"
               //border="1px solid"
            // minHeight="110px"
            // width="100%"
        >
            {/* <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191">
                    {title}
                </Typography>
            </Stack> */}

            <ReactApexChart
                options={{
                    chart: { 
                        type: {type},
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
                            return (val%1 !== 0) ? val.toFixed(2):val //val
                            //return val.toFixed(2);
                            //return val;
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
                            //customHTML: undefined,
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
                    stroke: {
                        width: 2
                    },
                    title: {
                        text: `${title}`,
                        align: 'center',
                        style: {
                            fontFamily: ["Rubik", "sans-serif"].join(","),
                            fontSize: 20,
                            color: "#808191",
                            fontWeight: 400
                          },
                    },
                    plotOptions: {
                        bar: {
                          //borderRadius: 4,
                          //horizontal: true,
                        }
                      },
                }}
                series={series}
                type={type}
                width="100%"
                height="280px"
                foreColor= '#373d3f'
            />
        </Box>
    );
};

export default AllChart;
