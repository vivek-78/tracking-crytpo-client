import React, { useEffect, useState } from "react";
import CryptoList from "./Row";
import { Typography } from "@mui/material";
import "./CyrptoTable.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import Cookies from "js-cookie";
import WatchList from "./WatchList";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addCoin, removeCoin } from "./store/WatchListSlice";

const CryptoTable = () => {
  const authToken = useSelector(state=>state.AuthToken.authToken);
  const [watchList, setWatchList] = useState([]);
  const watchList2 = useSelector((state) => state.WatchList.watchList);
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchWatchList = async () => {
    try {
      const fetchedData = await axios.post("http://localhost:8080/watchList", {
        headers: {
          authorization: authToken,
        },
      });
      const temp = fetchedData?.data;
      setWatchList(temp);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchWatchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWatchListClick = async (coin) => {
    try {
      dispatch(addCoin({ coin }));
      await axios.post("http://localhost:8080/addToWatchlist", {
        headers: {
          authorization: authToken,
        },
        coin: coin,
      });
      fetchWatchList();
    } catch (err) {
      alert(err);
    }
  };

  const handleRemoveCoin = async (coin) => {
    dispatch(removeCoin({ coin }));
    await axios.post("http://localhost:8080/removeFromWatchlist", {
      headers: {
        authorization: authToken,
      },
      coin: coin,
    });
    fetchWatchList();
  };

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
    <>
      {watchList2?.length > 0 && (
        <>
          <Typography
            variant="h6"
            sx={{ marginLeft: "20px", marginBottom: "10px", fontWeight: 550 }}
          >
            Your WatchList
          </Typography>
          <div className="cryptoTable">
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
                {watchList.map((coin) => (
                  <WatchList
                    coin={coin}
                    key={coin}
                    handleWatchClick={handleRemoveCoin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="cryptoTable">
        <Typography
          variant="h6"
          sx={{ marginLeft: "20px", marginBottom: "10px", fontWeight: 550 }}
        >
          Today's Cryptocurrency Prices
        </Typography>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
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
                    <CryptoList
                      coin={coin}
                      key={coin}
                      handleClick={handleWatchListClick}
                      isWatchList={watchList2.includes(coin)}
                    />
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
                  {watchList.map((coin) => (
                    <WatchList
                      coin={coin}
                      key={coin}
                      handleWatchClick={handleRemoveCoin}
                    />
                  ))}
                </tbody>
              </table>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};
export default CryptoTable;
