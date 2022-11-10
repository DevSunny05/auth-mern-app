import React, { useState } from "react";
import { AppBar,  Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Header = () => {
    const [value,setValue]=useState()
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">Mern Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs indicatorColor="secondary" onChange={(e,val)=>setValue(val)} value={value} textColor="inherit">
              <Tab LinkComponent={Link} to='/login' label="Login" />
              <Tab  LinkComponent={Link} to='/signup' label="Signup" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
