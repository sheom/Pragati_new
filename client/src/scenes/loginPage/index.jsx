import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { logo, bg } from "../../assets";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.main}
          p="1rem 6%"
          textAlign="center"
        ></Box>

        <Box
          width={isNonMobileScreens ? "30%" : "80%"}
          p="2rem"
          m="2.5rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          marginRight={"10%"}
        >
          <Box width={"100%"} textAlign="center">
            <img src={logo} width="80%" alt="Pragati by Peerless logo" />
            {/* <p>&nbsp;</p> */}
            {isNonMobileScreens ? <p>&nbsp;</p>  : ""}
          </Box>

          <Form />
        </Box>
      </Box>

    </div>
  );
};

export default LoginPage;
