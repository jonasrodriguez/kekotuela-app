import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import OrderInfo from "./OrderInfo";
import OrderTable from "./OrderTable";
import AddOrder from "./AddOrder";
import { FetchOrderList } from "../shared/api/Order"

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Orders(props) {
  const classes = props;
  const [orders, setOrders] = useState([]);  

  useEffect(() => {FetchOrderList(setOrders);}, [setOrders]); 

  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  if (isNewOrderOpen) {
    return (
      <Paper>
        <AddOrder onClose={()=>{setIsNewOrderOpen(false)}} />
      </Paper>
    );
  }
  return (
    <Paper>
      <List disablePadding>
        <OrderInfo openNewOrder={()=>{setIsNewOrderOpen(true)}} />
        <OrderTable orders={orders} />
      </List>  
    </Paper>    
  );
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Orders);
