import {createSlice} from "@reduxjs/toolkit";
const authTokenSlice = createSlice({
   name:"autnToken",
   initialState:{
    authToken:null
   },
   reducers:{
     setAuthToken:(state,action)=>{
      const newAuthToken = action.payload.authToken;
      state.authToken = newAuthToken;
     },
     removeAuthToken:(state)=>{
      state.authToken = null;
     },
   }
});
export const {setAuthToken,removeAuthToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;