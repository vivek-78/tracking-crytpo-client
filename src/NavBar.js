import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';

function NavBar() {
  return (
    <AppBar position="static" color="" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h5" sx={{ marginLeft: 'auto', fontWeight: '500' }}>
              ProjectName
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
