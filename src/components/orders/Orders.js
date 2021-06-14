import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { FetchOrders, DeleteOrder } from '../shared/api/Orders'
import AddOrder from "./AddOrder"
import OrderTable from "./OrderTable";
import DeleteDialog from "../shared/DeleteDialog"

const styles = {
  title: {
    flexGrow: 1,
  }, 
  divider: {
    borderColor: "rgba(0, 0, 0, 0.26)"
  }
};

const emptyUpdate = {update:false, order:''}
const emptyDelete = {open: false, name:'', id: '', message:''}

function Orders(props) {
  const { classes, mainSnackBar } = props;
  const [orders, setOrders] = useState([]);  
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(emptyUpdate);
  const [deleteInfo, setDeleteInfo] = useState(emptyDelete);

  useEffect(() => {FetchOrders(setOrders)}, [setOrders]);

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    setUpdateInfo(emptyUpdate);
    FetchOrders(setOrders);
  } 

  const updateItem = useCallback((index) => { 
    setUpdateInfo({update:true, order:orders[index]})
    setIsNewDiagOpen(true);
  }, [orders]);

  const deleteItem = useCallback((index) => { 
    const order = orders[index];
    setDeleteInfo({open: true, name: "Parte", id: order._id, message: "el parte con referencia " + order.reference});
  }, [orders]);

  const onCloseDelete = () => {
    setDeleteInfo(emptyDelete);
    FetchOrders(setOrders);
  }

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddOrder mainSnackBar={mainSnackBar} onClose={onDiagClose} updateInfo={updateInfo} />
      </Paper>
    );
  }
  return (
    <Paper>
      <Toolbar className={classes.appbar}>
        <Typography variant="h6" className={classes.title}>
          Lista de partes
        </Typography>        
        <Button variant="contained" onClick={() => {setIsNewDiagOpen(true)}}>
          Añadir parte
        </Button>
      </Toolbar>
      <Divider className={classes.divider} />
      <OrderTable orders={orders} updateItem={updateItem} deleteItem={deleteItem} />
      <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteOrder} mainSnackBar={mainSnackBar} />
    </Paper>   
  );
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  mainSnackBar: PropTypes.func,
};

export default withStyles(styles)(Orders);
