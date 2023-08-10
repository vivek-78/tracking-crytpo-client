import { Grid, Typography } from "@mui/material";
import { React } from "react";

const CoinDescription = (props) => {
  const { coin } = props;
  return (
    <Grid container>
      <Grid item>
        <Typography>{coin} this week.</Typography>
        <p>
          The price of {coin} has risen by 1.28% in the past 7 days. The price
          declined by 0.85% in the last 24 hours. In just the past hour, the
          price shrunk by 0.07%. The current price is $29,488.03 per BTC.
          Bitcoin is 57.13% below the all time high of $68,789.63. The current
          circulating supply is 19,452,950 BTC.
        </p>
      </Grid>
    </Grid>
  );
};

export default CoinDescription;
