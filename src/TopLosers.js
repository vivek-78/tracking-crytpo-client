import {React} from "react";
import { Grid,Typography } from "@mui/material";
import CryptoCard from "./CryptoCard";
const TopLosers = ()=>{
    return(
        <>
        <Typography
        variant="h6"
        sx={{ marginLeft: "20px", marginBottom: "10px", fontWeight: 550 }}
      >
        Today's Top Losers
      </Typography>
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{marginLeft:"10px"}}
      >
      <CryptoCard coin="BTC" price="1000" />
      <CryptoCard coin="ETH" price="1000" />
      <CryptoCard coin="SOL" price="1000" />
      <CryptoCard coin="ETH" price="1000" />
      </Grid>
      </>
    )
}

export default TopLosers;