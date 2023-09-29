import {React,useState} from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "./store/authTokenSlice";
import { removeWatchList } from "./store/WatchListSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.AuthToken.isLoggedIn);
  const [search, setSearch] = useState("");
  const textOnChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    dispatch(removeAuthToken());
    dispatch(removeWatchList());
    navigate("/login");
    toast.success("Logged out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSearchClick = async ()=>{
    const FetchedData = await axios.get(`https://api.coingecko.com/api/v3/search?query=${search}`);
    const coinSymbol = FetchedData?.data?.coins[0]?.symbol;
    const coinName = FetchedData?.data?.coins[0]?.id;
    if (search.toUpperCase() == coinSymbol || search.toLowerCase() == coinName) {
      navigate(`/${coinSymbol}`);
    }
  }
  return (
    <AppBar position="static" color="" sx={{ marginBottom: 2 }}>
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
              onClick={navigate("/")}
            >
              Tracking Crypto
            </Typography>
          </Grid>
          {isLoggedIn && (
            <form class="search-container">
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <input
                    type="text"
                    id="search-bar"
                    placeholder="Search for Crypto coins"
                    onChange={textOnChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "10px" }}
                    onClick={() => handleSearchClick()}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          {isLoggedIn && (
            <Grid item>
              <Button variant="outlined" onClick={() => handleClick()}>
                Log Out
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
