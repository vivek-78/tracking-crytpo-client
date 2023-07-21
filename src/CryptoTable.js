import React, { useEffect, useState } from "react";
import CryptoList from "./Row";
import { Grid, Typography } from "@mui/material";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import TrendingCoins from "./TrendingCoins";
import "./CyrptoTable.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import CryptoNews from "./CryptoNews";

const CryptoTable = () => {
    const [newsData, setNewsData] = useState({});
    var settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4
  };
    var count = 0;
    useEffect(() => {
    async function fetchData() {
      const fetchedData = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=557770814a82703ce2ed50c174c03264fee9a0117e1dc109f892d1a4f82084fc`
      );
      const data = fetchedData.data.Data;
      setNewsData(data);
    }
    fetchData();
  });
  const coins = [
    "BTC",
    "ETH",
    "SOL",
    "USDC",
    "TWT",
    "BNB",
    "ADA",
    "XLM",
    "TRX",
    "USDT",
    "THETA",
    "MATIC",
    "ETC",
    "DASH",
  ];
  return (
    <div className="cryptoTable">
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h5">Latest News</Typography> <br />
      </Grid>
      <Grid sx={{ marginLeft: 0, marginBottom: 2 }}>
        <Slider {...settings}>
          {Array.isArray(newsData)
            ? newsData.map((data) => (
                <div key={data.id}>
                  <CryptoNews
                    count={++count}
                    src={data.source_info.name}
                    title={data.title}
                    url={data.url}
                    image={data.imageurl}
                  />
                </div>
              ))
            : ""}
        </Slider>
      </Grid>
      <TopGainers />
      <TopLosers />
      <TrendingCoins />
      <Typography
        variant="h6"
        sx={{ marginLeft: "20px", marginBottom: "10px", fontWeight: 550 }}
      >
        Today's Cryptocurrency Prices
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change%</th>
            <th>Highest Today</th>
            <th>Lowest Today</th>
            <th>MARKET CAP</th>
            <th>7D chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CryptoList coin={coin} key={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CryptoTable;
