import { React, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css"

const Login2 = () => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("jwtToken");
    console.log(authToken);
    if (authToken) {
      navigate("/home");
    }
  }, []);
  const handleSumbit = async () => {
    try {
      const fetchedToken = await axios.post("http://localhost:8080/login", {
        userId,
        password,
      });
      console.log(fetchedToken);
      Cookies.set("UserToken", fetchedToken.data.token);
      navigate("/");
    } catch {
      alert("enter valid details");
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
        marginTop:"90px",
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
          {/* <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginBottom: "20px" }}
          >
            <h3 style={{ margin: "0px" }}>Tracking Crypto</h3>
            <h3 style={{ margin: "0px" }}>LOGIN</h3>
          </Grid> */}
          <Grid item>
          <Typography variant="h4" sx={{ fontWeight: "bold",marginBottom:"5px" }}>Login</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "normal",marginBottom:"5px" }}>Your Email</Typography>
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
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography sx={{fontWeight: "normal",width:"300px",marginLeft:"40px"}}>Dont have account? <a href="/">Register here</a></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Grid>
    </Grid> 
  );
};

export default Login2;
