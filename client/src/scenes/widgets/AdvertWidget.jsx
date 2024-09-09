import { Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import peerless_logo from "../../assets/peerless_logo.jpg";
import { useDispatch, useSelector } from "react-redux";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const subsidiary = useSelector((state) => state.user.subsidiary);
  const makeContent = () => {
    let final_content = (
      <>
        <ul>
          <li>
            Budget data form will only be available for the first quarter of
            the financial year.
          </li>
          <li>
            Please provide budget data month on month for financial metrics.
          </li>
          <li>
            Quarterly figures will be calculated automatically for Revenue, PBT,
            EBIDTA and Cashflow.
          </li>
          <li>
            For operational metrics, please fill month on month data and
            quarterly figure too.
          </li>
          <li>
            Actual data form will only be available for the first fifteen days
            of the next month.
          </li>
          <li>To view the dashboard, click on the “Dashboard” Button</li>
          <li>
            Customer ratings are gathered from publicly available websites as mentioned in the graph on quarterly basis on the last week of each quarter automatically via API for each property.
          </li>
          <li>
            In consolidated view the data is averaged out for each property across rating sites.
          </li>
        </ul>
      </>
    );

    // if(subsidiary === "Hotel"){
    //   final_content = hotel_content;
    // }else if(subsidiary === "Hospital"){
    //   final_content = hospital_content
    // }
    // else if (subsidiary === "PGFI")  {
    //   final_content =pgfi_content
    // }
    // final_content =``;
    return final_content;
  };

  return (
    <WidgetWrapper>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={peerless_logo}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      <Typography color={dark} variant="h4" fontWeight="500" align="center">
        Instructions
      </Typography>
      {/* <Divider />
      <Typography color={main} align="center" >
        How to use
      </Typography>  */}
      <FlexBetween></FlexBetween>
      <Divider />

      {/* <Typography fontSize="14px" color={medium} m="0.5rem 0"> */}
        {makeContent()}
      {/* </Typography> */}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
