import { React, useState, useEffect } from "react";
import CryptoList from "./Row";
import { Typography } from "@mui/material";
import axios from "axios";
const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const fetchTrendingCoins = async () => {
    const fetchedData = await axios.get("http://localhost:8080/trendingCoins");
    setTrendingCoins(fetchedData.data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, []);
  return (
    <>
      <Typography
        variant="h6"
        sx={{ marginLeft: "20px", marginBottom: "10px", fontWeight: 550 }}
      >
        Today's Trending Coins
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
          {trendingCoins?.map((coin) => (
            <CryptoList coin={coin} key={coin} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TrendingCoins;
