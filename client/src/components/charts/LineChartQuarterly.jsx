import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const LineChartQuarterly = ({ title, value, series, colors }) => {
    const {palette} = useTheme();

    return (
        <Box
            // id="chart"
            // flex={1}
             //display="flex"
             bgcolor= {palette.neutral.light}
             flexDirection="column"
             justifyContent="space-between"
            alignItems="center"
            // pl={3.5}
            // py={2}
            // gap={2}
               borderRadius="15px"
               border="1px solid"
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
                    chart: { type: "line" },
                    xaxis: {
                        categories: ["Q1",	"Q2", "Q3", "Q4"]
                    },
                    //colors,
                    legend: { show: true },
                    dataLabels: { enabled: true },
                    zoom: {
                        enabled: false
                      }
                }}
                series={series}
                type="line"
                width="95%"
                height= "250px"
            />
        </Box>
    );
};

export default LineChartQuarterly;
