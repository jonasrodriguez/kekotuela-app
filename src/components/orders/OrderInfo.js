import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function OrderInfo(props) {
  const { classes, openNewOrder } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Lista de partes" />
      <Button variant="contained" color="secondary" disableElevation onClick={openNewOrder}>
        Añadir Parte
      </Button>
    </Toolbar>
  );
}

OrderInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openNewOrder: PropTypes.object.isRequired
};

export default withStyles(styles)(OrderInfo);
