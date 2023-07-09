import { React } from "react";
import { Typography, Grid } from "@mui/material";
const CryptoCard = (props) => {
  const { coin, price } = props;
  return (
    <div className="card">
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        // justifyContent="center"
        // alignItems="center"
        sx={{
          width: "300px",
          height: "150px",
          marginLeft: "20px",
          marginBottom: "30px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 3px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Grid
          item
          container
          direction="row"
          // justifyContent="space-between"
          // alignItems="flex-start"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>{coin}</Typography>
          <img
            src={`https://images.cryptocompare.com/sparkchart/${coin}/USD/latest.png?ts=1687842000`}
            alt={coin}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          // justifyContent="center"
          // alignItems="center"
        >
          <Typography>${price}</Typography>
          <Typography>+20.5%</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CryptoCard;
