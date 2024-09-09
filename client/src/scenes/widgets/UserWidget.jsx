import {
  //ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
//import { Avatar } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
//import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setLogout } from "state";
//import users from "data/users"

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const dispatch = useDispatch();

  const getUser = async () => {
    // const user = users.filter((us)=>{
    //   return us._id === userId
    // })
    // setUser(user[0]);
    //https://sheom.in/
     //const response = await fetch(`http://localhost:4000/users/${userId}`, {
    const response = await fetch(`https://sheom.in/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    subsidiary,
    //viewedProfile,
    //impressions,
    //friends,
  } = user.user;

  const userLogs = [...user.userLog]
  userLogs.map((log)=>{
    let d=new Date(log.createdAt); 
    //alert (JSON.stringify(log))
    log.createdAt = d.toLocaleString() 
    return (log) 
  })


  //console.log(user)
  //console.log("userLogs")
  //console.log(userLogs);

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        //onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
        <Avatar sx={{ m: 1 , bgcolor: 'primary.main' }} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              // sx={{
              //   "&:hover": {
              //     color: palette.primary.light,
              //     cursor: "pointer",
              //   },
              // }}
            >
              {firstName} {lastName}
            </Typography>
            {/* <Typography color={medium}>{friends.length} friends</Typography> */}
          </Box>
        </FlexBetween>
        {/* <ManageAccountsOutlined /> */}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: 'primary.main'  }} />
          <Typography color={medium}>Location: {location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: 'primary.main' }} />
          <Typography color={medium}>{subsidiary}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Login History: </Typography>
          {/* <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography> */}
        </FlexBetween>
        
          <Typography color={medium}>This Session </Typography>
          <Typography color={main} fontWeight="500">
            {userLogs[0]? userLogs[0].createdAt.toLocaleString(): "First Login"}
          </Typography>
        
          <Typography color={medium}>Last Session </Typography>
          <Typography color={main} fontWeight="500">
            {userLogs[1]? userLogs[1].createdAt.toLocaleString(): "First Login"}
          </Typography>
        
          <Typography color={medium}>Before last Session </Typography>
          <Typography color={main} fontWeight="500">
            {userLogs[2]? userLogs[2].createdAt.toLocaleString(): "N/A"}
          </Typography>
        
      </Box>

      <Divider />
      {/* Buttons */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Navigation
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <Button variant="outlined" fullWidth onClick={() =>{
            if(subsidiary === "Hotel"){
              navigate("/hotel_home")
            }else{
              navigate("/home")
            }
            
          }} >
            Home
          </Button>
        </FlexBetween>
        
        <FlexBetween gap="1rem">
        <Button variant="outlined" fullWidth onClick={() => dispatch(setLogout())}>
            Logout
          </Button>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
