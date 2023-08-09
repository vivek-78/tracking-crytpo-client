import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CryptoDetailGraph from "./CryptoDetailGraph";
import { useParams } from "react-router-dom";

import axios from "axios";
const CryptoDetail = (props) => {
  const { coin } = useParams();
  const [coinData, setCoinData] = useState({});
  useEffect(() => {
    console.log(coin);
    async function fetchData() {
      const fetchedData = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=usd&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
      );
      console.log(fetchedData.data)
      const data = fetchedData?.data?.DISPLAY[coin];
      setCoinData(data?.USD);
    }
    fetchData();
  },[]);
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
          spacing={5}
        >
          <InfoComponent
            heading="price change(24H)"
            value={coinData.CHANGEPCT24HOUR}
          />
          <InfoComponent heading="Market cap" value="$500.8B" />
          <InfoComponent heading="Market cap" value="$500.8B" />
          <InfoComponent heading="Market cap" value="$500.8B" />
          <InfoComponent heading="Market cap" value="$500.8B" />
        </Grid>
      </Grid>
    </Grid>
  );
};

const InfoComponent = (props) => {
  const { heading, value } = props;
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      xs={3}
    >
      <Grid item>
        <Typography variant="h6">{heading}</Typography>
      </Grid>
      <Grid item>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default CryptoDetail;
