import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { FetchOrderList } from "../api/Order"
import AddOrder from "./AddOrder"
import OrderTable from "./OrderTable";

function Orders(props) {
  const { mainSnackBar } = props;
  const [orders, setOrders] = useState([]);  
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);

  useEffect(() => {FetchOrderList(setOrders)}, [setOrders]);

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    FetchOrderList(setOrders);
  } 

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddOrder mainSnackBar={mainSnackBar} onClose={onDiagClose} />
      </Paper>
    );
  }
  return (
    <Paper>
      <OrderTable orders={orders} onNewButtonClick={()=>{setIsNewDiagOpen(true)}} />
    </Paper>    
  );
}

export default Orders;
