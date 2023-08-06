import {React,useEffect} from 'react'

export default function graph() {
    useEffect(() => {
        function fetchData() {
          axios
            .get(
              `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${coin}&tsym=USD&limit=20&api_key=557770814a82703ce2ed50c174c03264fee9a0117e1dc109f892d1a4f82084fc`
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
