import {createSlice} from "@reduxjs/toolkit";
const WatchListSlice = createSlice({
   name:"watchList",
   initialState:{
    watchList:[]
   },
   reducers:{
     setWatchList:(state,action)=>{
      const watchListCoins = action.payload.watchList;
      state.watchList = [...state.watchList, ...watchListCoins];
     },
     removeWatchList:(state)=>{
      state.watchList = [];
     },
     removeCoin:(state,action)=>{
        const newWatchList = state.watchList.filter((watch)=> watch !== action.payload.coin);
        state.watchList = newWatchList;
     },
     addCoin : (state,action)=>{
      const newWatchList = [action.payload.coin,...state.watchList];
      state.watchList = newWatchList;
     }
   }
});
export const {setWatchList,removeWatchList,removeCoin,addCoin} = WatchListSlice.actions;
export default WatchListSlice.reducer;