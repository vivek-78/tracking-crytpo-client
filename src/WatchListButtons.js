import { Grid,Button } from "@mui/material";
import {React} from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addCoin, removeCoin } from "./store/WatchListSlice";

const WatchListButtons = (props)=>{
    const {coin} = props;
    console.log("Buttons "+coin);
    const dispatch = useDispatch();
    const authToken = useSelector(state=>state.AuthToken.authToken);
    const watchList = useSelector((state) => state.WatchList.watchList);
    const isWatchList=watchList.includes(coin)
    const handleRemoveCoin = async (coin) => {
        dispatch(removeCoin({ coin }));
        await axios.post("http://localhost:8080/removeFromWatchlist", {
          headers: {
            authorization: authToken,
          },
          coin: coin,
        });
      };
      const handleAddClick = async (coin) => {
        try {
          dispatch(addCoin({ coin }));
          await axios.post("http://localhost:8080/addToWatchlist", {
            headers: {
              authorization: authToken,
            },
            coin: coin,
          });
        } catch (err) {
          alert(err);
          console.log(err);
        }
      };
    return(
        <Grid>
         {isWatchList ? (
              <Button
                variant="outlined"
                color={"error"}
                sx={{marginRight:"40px"}}
                onClick={() => handleRemoveCoin(coin)}
                startIcon={<RemoveIcon />}
              >
                Watch List
              </Button>
            ) : (
              <Button
                variant="outlined"
                color={"success"}
                sx={{marginRight:"40px"}}
                onClick={() => handleAddClick(coin)}
                startIcon={<AddIcon />}
              >
                Watch List
              </Button>
            )}{" "}
        </Grid>
    )
}

export default WatchListButtons;