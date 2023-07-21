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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel'; 
import WatchList from "./WatchList";

const CryptoTable = () => {
  const [watchList, setWatchList] = useState([]);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  const temp =[]
  const handleWatchListClick = (coin) =>{
    if(!(watchList.includes(coin))){
    setWatchList([...watchList, coin])
    temp.push(coin)
    console.log(temp)
    localStorage.setItem('watchlist',JSON.stringify(temp))
    }
  }

  const handleRemoveCoin = (coin) =>{
    const newWatch = watchList.filter((watch)=> watch !== coin)
    setWatchList(newWatch)
    localStorage.setItem('watchlist',JSON.stringify(newWatch))
  }

  useEffect(()=>{
  const storedWatchList = JSON.parse(localStorage.getItem('watchlist'))
  if(storedWatchList) setWatchList(storedWatchList)
  },[])



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
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} >
            <Tab label="Crypto Coins" value="1" />
            <Tab label="Watch List" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => (
            <CryptoList coin={coin} key={coin} handleClick={handleWatchListClick} />
          ))}
        </tbody>
      </table>
        </TabPanel>
        <TabPanel value="2">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {watchList?.map((coin) => (
            <WatchList coin={coin} key={coin} handleWatchClick={handleRemoveCoin} />
          ))}
        </tbody>
      </table>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
  );
};
export default CryptoTable;
