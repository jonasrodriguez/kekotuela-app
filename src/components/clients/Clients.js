import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ClientTable from "./ClientTable";
import AddClient from "./AddClient";
import DeleteDialog from "../shared/DeleteDialog";
import SectionHeader from "../shared/SectionHeader";
import { FetchClients, DeleteClient } from '../shared/api/Clients'

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

const emptyUpdate = {update:false, client:''}
const emptyDelete = {open: false, name:'', id: '', message:''}

function Clients(props) {
  const { classes, mainSnackBar } = props;
  const [clients, setClients] = useState([]);  
  const [filter, setFilter] = useState('');
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(emptyDelete);
  const [updateInfo, setUpdateInfo] = useState(emptyUpdate);

  useEffect(() => {FetchClients(setClients);}, [setClients]);  

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    setUpdateInfo(emptyUpdate);
    FetchClients(setClients);
  } 

  const updateItem = useCallback((index) => { 
    setUpdateInfo({update:true, client:clients[index]})
    setIsNewDiagOpen(true);
  }, [clients]);

  const deleteItem = useCallback((index) => { 
    const client = clients[index];
    setDeleteInfo({open: true, name: "Cliente", id: client._id, 
      message: "cliente " + client.name + " " + client.surname});
  }, [clients]);

  const onCloseDelete = () => {
    setDeleteInfo(emptyDelete);
    FetchClients(setClients);
  }

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddClient mainSnackBar={mainSnackBar} onClose={onDiagClose} updateInfo={updateInfo} /> 
      </Paper>
    );
  }
  return (
    <Paper>
      <List disablePadding>
        <SectionHeader title="Lista clientes" searchFunc={value => {setFilter(value.toLowerCase())}} buttonText="Añadir Cliente" buttonFunc={() => {setIsNewDiagOpen(true)}} />
        <Divider className={classes.divider} />
        <ClientTable clients={clients} filter={filter} updateItem={updateItem} deleteItem={deleteItem} />
        <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteClient} mainSnackBar={mainSnackBar} />
      </List>  
    </Paper>    
  );
}

Clients.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Clients);
