import React from "react";
import PropTypes from "prop-types";
import { Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function ClientInfo(props) {
  const { classes, openAddClientModal } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={openAddClientModal}
      >
        Añadir Cliente
      </Button>
    </Toolbar>
  );
}

ClientInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddClientModal: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientInfo);
