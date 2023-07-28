import { React, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const CryptoDetail = () => {
  const { coin } = useParams();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    function fetchData() {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&limit=1000&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
        )
        .then((fetchedData) => {
          const data = fetchedData.data.Data.Data;
          setChartData(Object.keys(data).map((item) => [data[item].time * 1000, data[item].close]));
        });
    }
    fetchData();
  }, [coin]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Chart
          type="area"
          height={"250%"}
          width={"100%"}
          series={[
            {
              name: coin,
              data: chartData || []
            }
          ]}
          options={{
            xaxis: {
              type: "datetime"
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "smooth",
              width: 2
            }
          }}></Chart>
      </Grid>
    </Grid>
  );
};
export default CryptoDetail;
