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
        sx={{ margin: "20px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ marginBottom: "10px" }}>
            Market
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Typography variant={"h5"}>Market cap</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant={"h5"}>Market cap</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant={"h5"}>Market cap</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant={"h5"}>Market cap</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptoDetail;
