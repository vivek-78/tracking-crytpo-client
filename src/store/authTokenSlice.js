import {createSlice} from "@reduxjs/toolkit";
const authTokenSlice = createSlice({
   name:"autnToken",
   initialState:{
    authToken:null,
    isLoggedIn:false
   },
   reducers:{
     setAuthToken:(state,action)=>{
      const newAuthToken = action.payload.authToken;
      state.authToken = newAuthToken;
      state.isLoggedIn = true
     },
     removeAuthToken:(state)=>{
      state.authToken = null;
      state.isLoggedIn = false;
     },
   }
});
export const {setAuthToken,removeAuthToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;