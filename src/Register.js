import { React, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {setWatchList} from "./store/WatchListSlice";
import { toast } from 'react-toastify';
import {setAuthToken} from "./store/authTokenSlice";
import "./Login.css" 

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.AuthToken.isLoggedIn);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const handleSumbit = async () => {
    try {
      const fetchedToken = await axios.post("http://localhost:8080/register", {
        firstName,
        lastName,
        email,
        userId,
        password,
      });
      dispatch(setAuthToken({authToken:fetchedToken.data.token}));
      navigate("/");
    } catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
    <Grid item>
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop:"50px",
        backgroundColor: "white",
        boxShadow: "0 3px 4px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Grid item>
        <img
          src="/images/landingPage.png"
          style={{ width: "300px", height: "300px" }}
          alt="login"
        />
      </Grid>
      <Grid item>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          xs={6}
        >
          <Grid item>
          <Typography variant="h4" sx={{ fontWeight: "bold",marginBottom:"5px" }}>Register</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>First Name</Typography>
            <input
              className="btn"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="enter your user Id"
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>Last Name</Typography>
            <input
              className="btn"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="enter your user Id"
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>User Id</Typography>
            <input
              className="btn"
              type="text"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="enter your user Id"
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>Your Email</Typography>
            <input
              className="btn"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="enter your user Id"
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>Password</Typography>
            <input
              className="btn"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="enter password"
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleSumbit}
              variant="contained"
              sx={{
                width: "326px",
                marginTop:"15px",
                marginBottom: "10px",
                backgroundColor: "#2F55D4",
                color: "white"
              }}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Typography sx={{fontWeight: "normal",width:"300px",marginLeft:"40px"}}>already have an account? <a href="/login">Login here</a></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Grid>
    </Grid> 
  );
};

export default Register;
