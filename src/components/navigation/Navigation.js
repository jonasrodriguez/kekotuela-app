import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, AppBar, Drawer, Toolbar, Typography, Button } from "@material-ui/core";
import NavItems from "./NavItems"

const styles = (theme) => ({ 
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    overflowX: "hidden",
    marginTop: theme.spacing(8),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  }, 
});

function Navigation(props) {
  const { classes } = props;
  
  return (
    <Fragment>
      <Box className={classes.root}>
        <AppBar position="static" style={{ background: 'white' }}>
          <Toolbar>
            <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
              <Typography variant="h4" display="inline" color="primary" className={classes.brandText}>
                koke
              </Typography>
              <Typography variant="h4" display="inline" color="secondary" className={classes.brandText}>
                tuela
              </Typography>
            </Box>
            <Button color="primary">Login</Button>              
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer variant="permanent"  classes={{ paper: classes.drawerPaper }} >
        <NavItems />
      </Drawer>      
    </Fragment>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles, { withTheme: true })(Navigation));
