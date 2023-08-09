import { React, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const CryptoDetailGraph = () => {
  const { coin } = useParams();
  const [chartData, setChartData] = useState([]);
  function fetchData() {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&limit=1000&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
      )
      .then((fetchedData) => {
        const data = fetchedData.data.Data.Data;
        setChartData(
          Object.keys(data).map((item) => [
            data[item].time * 1000,
            data[item].close,
          ])
        );
      });
  }
  const oneHourClick = () => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coin}&tsym=USD&limit=24&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
      )
      .then((fetchedData) => {
        const data = fetchedData.data.Data.Data;
        setChartData(
          Object.keys(data).map((item) => [
            data[item].time * 1000,
            data[item].close,
          ])
        );
      });
  };
  const minuteClick = () => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${coin}&tsym=GBP&limit=60&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
      )
      .then((fetchedData) => {
        const data = fetchedData.data.Data.Data;
        console.log(data);
        setChartData(
          Object.keys(data).map((item) => [
            data[item].time * 1000,
            data[item].close,
          ])
        );
      });
  };
  useEffect(() => {
    fetchData();
  }, [coin]);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      style={{marginTop:"2rem"}}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => oneHourClick()}
          >
            1Hr
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => minuteClick()}
          >
            5MIN
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => fetchData()}
          >
            1D
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Chart
          type="area"
          height={"250%"}
          width={"100%"}
          series={[
            {
              name: coin,
              data: chartData || [],
            },
          ]}
          options={{
            xaxis: {
              type: "datetime",
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            chart: {
              toolbar: {
                show: false,
                download: false,
                selection: false,
                zoom: false,
                zoomin: true,
                zoomout: false,
                pan: false,
                reset: false,
              },
            },
          }}
        ></Chart>
      </Grid>
    </Grid>
  );
};
export default CryptoDetailGraph;
