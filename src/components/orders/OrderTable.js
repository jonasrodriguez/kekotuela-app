import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, Paper, Typography, Grid } from "@material-ui/core";
import HighlightedInformation from "../shared/HighlightedInformation"
import Pagination from "../shared/Pagination"
import RowControls from "../shared/RowControls"

const rowsPerPage = 25;

const styles = theme => ({
    tableWrapper: {
      width: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    contentWrapper: {
      padding: theme.spacing(3),
      width: "100%"
    },
})

function OrderTable(props) {
  const { classes, orders, updateItem, deleteItem } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback((_, page) => { 
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
    <Box className={classes.tableWrapper}>
      {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                      Total: {order.total} €
                  </Typography>
              </Grid>
              <Grid item xs={4}>                  
                  <Typography variant="body2" gutterBottom>
                      {order.note.client.name} {order.note.client.surname} {order.note.client.second_surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                      {order.note.client.phone} - {order.note.client.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      {order.note.client.address}. {order.note.client.city}, {order.note.client.cp}
                  </Typography>
              </Grid>
              <Grid item>
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)} />
              </Grid>
          </Grid>
        </Paper>
      ))}
      <Pagination items={orders} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
    </Box>
  );
}

OrderTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrderTable);
