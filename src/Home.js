import {React,useEffect} from "react";
// import TopGainers from "./TopGainers";
// import TopLosers from "./TopLosers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoTable from "./CryptoTable";
// import TrendingCoins from "./TrendingCoins";
import News from "./News";
import "./CyrptoTable.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  const isLoggedIn = useSelector(state => state.AuthToken.isLoggedIn);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <News />
      {/* <TopGainers />
      <TopLosers /> */}
      {/* <TrendingCoins /> */}
      <CryptoTable />
    </>
  );
};

export default Home;
