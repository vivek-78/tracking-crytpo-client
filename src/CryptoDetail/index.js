import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CryptoDetailGraph from "./CryptoDetailGraph";
import CoinDescription from "./CoinDescription";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
      const data = fetchedData?.data?.DISPLAY[coin];
      console.log(data?.USD);
      setCoinData(data?.USD);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      sx={{ backgroundColor: "#FFFFFF", margin: "10px", width: "98%",paddingLeft:"10px" }}
    >
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ marginTop: "5px", marginLeft: "10px" }}
        xs={3}
      >
        <Grid item>
          <Typography variant="h6">
            <img
              src={`https://www.cryptocompare.com${coinData.IMAGEURL}`}
              width={40}
              height={40}
              alt=""
            />
            {coin}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={"h3"}>{coinData.PRICE}</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
        sx={{PaddingLeft:"10px",PaddingTop:"10px",paddingBottom:"20px",paddingLeft:"20px"}}
      >
        <InfoComponent heading="Market Capital" value={coinData.MKTCAP} />
        <InfoComponent heading="Volume(Day)" value={coinData.VOLUMEDAYTO} />
        <InfoComponent heading="Opening Price" value={coinData.OPEN24HOUR} />
        <InfoComponent heading="Highest Today" value={coinData.HIGH24HOUR} />
        <InfoComponent heading="Lowest Today" value={coinData.LOW24HOUR} />
        <InfoComponent heading="Change(24hr) %" value={coinData.CHANGEPCT24HOUR+"%"} />
        <InfoComponent heading="Volume (24hr)" value={coinData.VOLUME24HOUR} />
        <InfoComponent heading="Price Change (1hr)" value={coinData.CHANGEHOUR} />
      </Grid>
      <Grid item>
        <CryptoDetailGraph />
      </Grid>
      {/* <Grid item>
        <CoinDescription />
      </Grid> */}
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
        <Typography variant="h6" sx={{color:"#258FFB"}}>{heading}</Typography>
      </Grid>
      <Grid item>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default CryptoDetail;

{
  /* <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={5}
      >
        <InfoComponent heading="Market Capital" value={coinData.PRICE} />
        <InfoComponent heading="Volume" value={coinData.TOTALVOLUME24HTO} />
        <InfoComponent heading="Opening Price" value={coinData.OPEN24HOUR} />
        <InfoComponent heading="Highest Today" value={coinData.HIGH24HOUR} />
        <InfoComponent heading="Lowest Today" value={coinData.LOW24HOUR} />
      </Grid> */
}
