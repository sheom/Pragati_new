import { Box, useTheme } from "@mui/material";
import { colorTokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  // const theme = useTheme();
  // const colors = colorTokens(theme.palette.mode);
  const { palette } = useTheme();
  const colors = palette.neutral.main;


  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors} ${angle}deg 360deg),
            ${colors}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
