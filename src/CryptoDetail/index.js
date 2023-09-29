import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CryptoDetailGraph from "./CryptoDetailGraph";
import { useParams } from "react-router-dom";
import WatchListButtons from "../WatchListButtons";
import axios from "axios";
const CryptoDetail = (props) => {
  const { coin } = useParams();
  console.log("cryptodetail: "+coin);
  const [priceColor, setPriceColor] = useState();
  const [coinData, setCoinData] = useState({});
  var previousValue = 0;
  function setPriceChange(originalPrice) {
    let trimmedPrice = originalPrice?.substring(2);
    let parsedPrice = parseFloat(trimmedPrice?.replace(/,/g, ""));

    if (previousValue > parsedPrice) {
      setPriceColor("#FF0000");
    } else {
      setPriceColor("#00FF00");
    }

    previousValue = parsedPrice;
  }
  
  useEffect(() => {
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

  useEffect(() => {
    async function changeInPrice() {
      await setPriceChange(coinData?.PRICE);
    }
    changeInPrice();
  }, [coinData.PRICE]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      sx={{
        backgroundColor: "#FFFFFF",
        margin: "10px",
        width: "98%",
        paddingLeft: "10px",
      }}
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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
            <WatchListButtons coin={coin}/>
          </Grid> 
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
        sx={{
          PaddingLeft: "10px",
          PaddingTop: "10px",
          paddingBottom: "20px",
          paddingLeft: "20px",
        }}
      >
        <InfoComponent heading="Market Capital" value={coinData.MKTCAP} />
        <InfoComponent heading="Volume(Day)" value={coinData.VOLUMEDAYTO} />
        <InfoComponent heading="Opening Price" value={coinData.OPEN24HOUR} />
        <InfoComponent heading="Highest Today" value={coinData.HIGH24HOUR} />
        <InfoComponent heading="Lowest Today" value={coinData.LOW24HOUR} />
        <InfoComponent
          heading="Change(24hr) %"
          value={coinData.CHANGEPCT24HOUR + "%"}
        />
        <InfoComponent heading="Volume (24hr)" value={coinData.VOLUME24HOUR} />
        <InfoComponent
          heading="Price Change (1hr)"
          value={coinData.CHANGEHOUR}
        />
      </Grid>
      <Grid item >
        <CryptoDetailGraph/>
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
        <Typography variant="h6" sx={{ color: "#258FFB" }}>
          {heading}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default CryptoDetail;
