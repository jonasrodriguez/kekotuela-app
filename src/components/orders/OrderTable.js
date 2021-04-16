import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, TablePagination, Typography, withStyles } from "@material-ui/core";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import HighlightedInformation from "../shared/HighlightedInformation";

const styles = theme => ({
  tableWrapper: {
    //overflowX: "auto",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    //maxWidth: 500,
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "name",
    label: "Nombre"
  },
  {
    id: "date",
    label: "Fecha"
  },
  {
    id: "priority",
    label: "Priority"
  },
  {
    id: "city",
    label: "Ciudad"
  }
];

const rowsPerPage = 25;

function OrderTable(props) {
  const { orders, classes } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  if (!orders.length) {
    return (
      <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay partes en el sistema.
        </HighlightedInformation>
      </Box> 
    );
  }
  return (
    <Box className={classes.tableWrapper}>
      {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((order, index) => (
        <Paper variant="outlined" className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="body2" color="textSecondary">
                Num. {order.readableId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {order.client.name} {order.client.surname} {order.client.second_surname}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Cliente: {order.client.name} {order.client.surname} {order.client.second_surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: 1030114
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">$19.00</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}      
      <TablePagination
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{"aria-label": "Previous Page"}}
        nextIconButtonProps={{"aria-label": "Next Page"}}
        onChangePage={handleChangePage}
        classes={{
          select: classes.dNone,
          selectIcon: classes.dNone,
          actions: orders.length > 0 ? classes.dBlock : classes.dNone,
          caption: orders.length > 0 ? classes.dBlock : classes.dNone
        }}
        labelRowsPerPage=""
      />
    </Box>
  );
}

OrderTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(OrderTable);
