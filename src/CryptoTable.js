import React from "react";
import CryptoList from "./Row";
import { Typography } from "@mui/material";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import TrendingCoins from "./TrendingCoins";
import "./CyrptoTable.css";

const CryptoTable = () => {
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
