import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import ClientTable from "./ClientTable";
import ClientInfo from "./ClientInfo";
import AddClient from "./AddClient";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Clients(props) {
  const classes = props;
  const [clients, setClients] = useState([]);  

  const fetchClientList = useCallback(() => {
    fetch('http://localhost:3001/clients')
    .then(res => res.json())
    .then((data) => { setClients(data); })  
  }, [setClients]);

  useEffect(() => {fetchClientList();}, [fetchClientList]);

  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const openAddClientModal = useCallback(() => {
    setIsAddClientOpen(true);
  }, [setIsAddClientOpen]);

  const closeAddClientModal = useCallback(() => {
    setIsAddClientOpen(false);
  }, [setIsAddClientOpen]);

  if (isAddClientOpen) {
    return (
      <Paper>
        <AddClient onClose={closeAddClientModal} /> 
      </Paper>
    );
  }
  return (
    <Paper>
      <List disablePadding>
        <ClientInfo openAddClientModal={openAddClientModal} />
        <Divider className={classes.divider} />
        <ClientTable clients={clients} />
      </List>  
    </Paper>    
  );
}

Clients.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Clients);