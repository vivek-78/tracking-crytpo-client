import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CryptoDetailGraph from "./CryptoDetailGraph";
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
      console.log(fetchedData.data)
      const data = fetchedData?.data?.DISPLAY[coin];
      setCoinData(data?.USD);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid
        item
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ margin: "20px" }}
      >
        <Card sx={{ height: 270 }}>
          <CardContent style={{paddingTop:"1rem", paddingLeft:"3rem"}}>
            <Grid container direction="row" columnSpacing={2} rowGap={6}>
              <Grid
                xs={3}
                item
              >
                <img
                  src={`https://www.cryptocompare.com${coinData.IMAGEURL}`}
                  width={70}
                  height={70}
                  alt=""
                />
                <Typography variant="subtitle1" style={{paddingLeft:"1rem"}}>{coin}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Price</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.PRICE}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Market Capital</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.MKTCAP}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Volume</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.TOTALVOLUME24HTO}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Opening Price</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.OPEN24HOUR}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Highest Today</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.HIGH24HOUR}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Lowest Today</Typography>
                <Typography variant="subtitle2" style={{paddingTop:"1rem"}}>{coinData.LOW24HOUR}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      <Grid item>
        <CryptoDetailGraph />
      </Grid>
      </Grid>
    </Grid>
  );
};

// const InfoComponent = (props) => {
//   const { heading, value } = props;
//   return (
//     <Grid
//       item
//       container
//       direction="column"
//       justifyContent="flex-start"
//       alignItems="flex-start"
//       xs={3}
//     >
//       <Grid item>
//         <Typography variant="h6">{heading}</Typography>
//       </Grid>
//       <Grid item>
//         <Typography>{value}</Typography>
//       </Grid>
//     </Grid>
//   );
// };

export default CryptoDetail;
