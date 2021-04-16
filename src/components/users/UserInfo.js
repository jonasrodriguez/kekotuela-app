import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function ClientInfo(props) {
  const { classes, openAddUserModal } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Lista usuarios" /*secondary="Premium Account"*/ />
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={openAddUserModal}
      >
        Añadir Usuario
      </Button>
    </Toolbar>
  );
}

ClientInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddUserModal: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientInfo);
