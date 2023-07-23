import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import CryptoTable from "./CryptoTable";
import TrendingCoins from "./TrendingCoins";
import News from "./News";
import "./CyrptoTable.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  return (
    <>
      <TopGainers />
      <TopLosers />
      <TrendingCoins />
      <CryptoTable />
      <News />
    </>
  );
};

export default Home;
