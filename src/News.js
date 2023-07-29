import {React,useState,useEffect} from "react";
import {Grid,Typography} from "@mui/material";
import CryptoNews from "./CryptoNews";
import axios from "axios";
import Slider from "react-slick";

const News = ()=>{
    useEffect(() => {
        async function fetchData() {
          const fetchedData = await axios.get(
            `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=b8be1fb16bcb848129a994cee14b248620fef28d3446ac8a5e1571f82c0e15fe`
          );
          const data = fetchedData.data.Data;
          setNewsData(data);
        }
        fetchData();
      });
    const [newsData, setNewsData] = useState({});
    var settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
      };
    var count = 0;
    return(
     <>
      <Grid item xs={12} sx={{ marginBottom:"10px" }}>
      <Typography
        variant="h6"
        sx={{ marginLeft: "20px", fontWeight: 550 }}
      >
        Latest News
      </Typography>
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
     </>
    )
}

export default News;