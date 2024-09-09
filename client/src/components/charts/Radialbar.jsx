import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const Radialbar = ({ title, series, options, type, colors, total }) => {
    //
    
    options = {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          },
        },
        stroke: {
          dashArray: 4
        },
        labels: ['Achieved TD'],
      }

    //
    return (
        <Box
            bgcolor= "#ffffff"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            height={"100%"}
        >
            <Stack direction="column" alignItems="center" alignContent="center" >
                <Typography fontSize={20} color="#808191">
                    {title}
                </Typography>
            </Stack>

            <ReactApexChart options={options} series={series} type="radialBar" height={250} color="#FF0000" />

            {/* <ReactApexChart 
                options={ options } 
                series={ series } 
                type="radialBar" 
                height={250} 
            /> */}
    </Box>
    );
};

export default Radialbar;
