import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, Paper, Typography, Grid } from "@material-ui/core";
import HighlightedInformation from "../shared/HighlightedInformation"
import Pagination from "../shared/Pagination"
import RowControls from "../shared/RowControls"

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  contentWrapper: {
    padding: theme.spacing(3),
  },
})

function OrderTable(props) {
  const { classes, orders, updateItem, deleteItem } = props;
  const [page, setPage] = useState({page:0, rowsPerPage:10});

  const onChangePage = useCallback((page) => { 
      setPage(page); 
  }, [setPage]);

  if (!orders.length) {
    return (
      <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay albaranes en el sistema.
        </HighlightedInformation>
      </Box>   
    );
  }
  return (
    <Box>
      {orders
      .map((order, index) => (
        <Paper variant="outlined" className={classes.paper} key={index}>
          <Grid container spacing={2}>
              <Grid item xs={2}>
                  <Typography variant="body2" color="textSecondary">{order.reference}</Typography>
              </Grid>
              <Grid item xs={4}>                  
                  <Typography variant="body2" gutterBottom>
                      {order.note.description}
                  </Typography>                 
              </Grid>
              <Grid item xs={4}>                  
                  <Typography variant="body2" gutterBottom>
                      {order.client.name} {order.client.surname} {order.client.second_surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                      {order.client.phone} - {order.client.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      {order.client.address}. {order.client.city}, {order.client.cp}
                  </Typography>
              </Grid>
              <Grid item>
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)} />
              </Grid>
          </Grid>
        </Paper>
      ))}
      <Pagination items={orders} page={page} onChangePage={onChangePage} />
    </Box>
  );
}

OrderTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrderTable);
