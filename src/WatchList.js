import { React, useState, useEffect } from "react";
import axios from "axios";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
var previousValue = 0;

const WatchList = (props) => {
  const { coin, handleWatchClick } = props;
  // const [watchList, setWatchList] = useState([]);
  const [coinData, setCoinData] = useState({});
  const navigate = useNavigate();
  const [priceColor, setPriceColor] = useState();
  var percentColor;
  const handleRowClick = () => {
    navigate(`/${coin}`);
  };
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
  if (coinData.CHANGEPCTDAY > 0) {
    percentColor = "#00FF00";
  } else {
    percentColor = "#FF0000";
  }
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD&api_key=557770814a82703ce2ed50c174c03264fee9a0117e1dc109f892d1a4f82084fc`
      );
      const data = fetchedData?.data?.DISPLAY[coin];
      setCoinData(data?.USD);
    }
    fetchData();
  });
  useEffect(() => {
    async function changeInPrice() {
      await setPriceChange(coinData?.PRICE);
    }
    changeInPrice();
  }, [coinData.PRICE]);
  return (
    <>
      {coinData === null ? (
        <></>
      ) : (
        <tr
          key={coin}
          style={{ cursor: "pointer" }}
        >
          <td
            onClick={handleRowClick}
          >
            <img
              src={`https://www.cryptocompare.com${coinData.IMAGEURL}`}
              width={40}
              height={40}
              alt=""
            />
            {coin}
          </td>
          <td 
          onClick={handleRowClick}
          style={{ color: priceColor }}>
            <Typography>
              {coinData.PRICE}
              {priceColor === "#00FF00" ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </Typography>
          </td>
          <td 
          onClick={handleRowClick}
          style={{ color: percentColor }}>
            <Typography sx={{ fontWeight: 500 }}>
              {coinData.CHANGEPCTDAY}%{""}
              {coinData.CHANGEPCTDAY > 0 ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </Typography>
          </td>
          <td
          onClick={handleRowClick}
          >
            <Typography>{coinData.HIGH24HOUR}</Typography>
          </td>
          <td align="center" onClick={handleRowClick} sx={{ padding: "0px 0px 0px 0px" }}>
            <Typography>{coinData.LOW24HOUR}</Typography>
          </td>
          <td onClick={handleRowClick}>
            <Typography>{coinData.MKTCAP}</Typography>
          </td>
          <td onClick={handleRowClick}>
            <img
              src={`https://images.cryptocompare.com/sparkchart/${coin}/USD/latest.png?ts=1687842000`}
              alt={coin}
            />
          </td>
          <td>
            <Button variant="outlined" color={"error"} onClick={() => handleWatchClick(coin)} startIcon={<RemoveIcon /> }>Watch List</Button>
          </td>
        </tr>
      )}
    </>
  );
};

export default WatchList;
