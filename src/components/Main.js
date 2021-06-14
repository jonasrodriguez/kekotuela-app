import React, { memo, useState, Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import ConsecutiveSnackbarMessages from "./shared/ConsecutiveSnackbarMessages"
import LoginDialog from "./navigation/LoginDialog";
import Navigation from "./navigation/Navigation";
import Routing from "./Routing";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [openLoginDialog, setOpenLoginDialog] = useState(true);
  const [mainSnackBar, setMainSnackBar] = useState([]);

  const getMessageToSnackBar = useCallback(
    (pushMessage) => {
      setMainSnackBar(() => pushMessage);
  },[setMainSnackBar]);

  return (
    <Fragment>
      <LoginDialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} />
      <Navigation />
      <ConsecutiveSnackbarMessages getMessageToSnackBar={getMessageToSnackBar} />
      <main className={classNames(classes.main)}>
        <Routing mainSnackBar={mainSnackBar}/>
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
