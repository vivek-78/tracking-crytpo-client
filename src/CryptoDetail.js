import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CryptoDetailGraph from "./CryptoDetailGraph";
const CryptoDetail = (props) => {
  const { coin } = props;
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item>
        <CryptoDetailGraph />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid>
            <Typography variant="h2">Market</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptoDetail;
