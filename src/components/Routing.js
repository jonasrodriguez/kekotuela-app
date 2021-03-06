import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PropsRoute from "./shared/PropsRoute";

import Clients from "./clients/Clients";
import Users from "./users/Users";
import Materials from "./materials/Materials";
import Services from "./services/Services";
import Notes from "./notes/Notes";
import Orders from "./orders/Orders";

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
  const {classes, mainSnackBar} = props;
  return (
    <div className={classes.wrapper}>
      <Switch>        
        <PropsRoute
          path="/c/notes"
          component={Notes}
          mainSnackBar={mainSnackBar}
        />
        <PropsRoute
          path="/c/orders"
          component={Orders}
          mainSnackBar={mainSnackBar}
        />
        <PropsRoute
          path="/c/services"
          component={Services}
          mainSnackBar={mainSnackBar}
        />
        <PropsRoute
          path="/c/materials"
          component={Materials}
          mainSnackBar={mainSnackBar}
        />        
        <PropsRoute
          path="/c/clients"
          component={Clients}
          mainSnackBar={mainSnackBar}
        />
        <PropsRoute
          path="/c/users"
          component={Users}
          mainSnackBar={mainSnackBar}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
