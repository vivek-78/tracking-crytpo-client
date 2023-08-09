import {React,useEffect} from 'react'

export default function graph() {
    useEffect(() => {
        function fetchData() {
          axios
            .get(
              `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${coin}&tsym=USD&limit=20&api_key=6706b43124d7e0ea0461ed0aaba8e7f1ce88391081c5059678c0dd8fc9136325`
            )
            .then((fetchedData) => {
              const data = fetchedData.data.Data.Data;
              const times = data.map((obj) => new Date(obj.time * 1000).getHours());
              const prices = data.map((obj) => obj.close.toString());
              setChartData({ times, prices });
            });
        }
        fetchData();
      });
  return (
    <polyline points = {...prices}/>
  )
}
