import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const LineChart = ({ title, value, series, colors }) => {
    const {palette} = useTheme();

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
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191">
                    {title}
                </Typography>
            </Stack>

            <ReactApexChart
                options={{
                    chart: { 
                        type: "line",
                        zoom: {
                            enabled: false
                        }
                    },
                    
                    xaxis: {
                        categories: ["Apr",	"May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"]
                    },
                    //colors: ['#2E93fA', '#66DA26', '#546E7A'],
                    legend: { show: true },
                    dataLabels: { enabled: true },
                }}
                series={series}
                type="line"
                width="100%"
                height= "250px"
            />
        </Box>
    );
};

export default LineChart;
