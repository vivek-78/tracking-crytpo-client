import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "./store/authTokenSlice";
import { removeWatchList } from "./store/WatchListSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.AuthToken.isLoggedIn);
  const handleClick = ()=>{
     dispatch(removeAuthToken());
     dispatch(removeWatchList());
     navigate("/login");
     toast.success('Logged out Successfully', {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  return (
    <AppBar
      position="static"
      color=""
      sx={{ marginBottom: 2 }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              sx={{ marginLeft: "auto", fontWeight: "500" }}
            >
              Tracking Crypto
            </Typography>
          </Grid>
          {isLoggedIn && <Grid item>
          <Button variant="outlined" onClick={() => handleClick()}>Log Out</Button>
          </Grid>}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
