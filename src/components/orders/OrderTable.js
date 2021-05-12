import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, List, ListItemText, Toolbar, Paper, Typography, Grid, withStyles } from "@material-ui/core";
import HighlightedInformation from "../shared/HighlightedInformation"
import Pagination from "../shared/Pagination"

const rowsPerPage = 25;

const styles = theme => ({
    tableWrapper: {
      width: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
})

function OrderTable(props) {
    const { classes, orders, onNewButtonClick } = props;
    const [page, setPage] = useState(0);

    const handleChangePage = useCallback((_, page) => { 
        setPage(page); 
    }, [setPage]);

    const emptyTable = (
        <Box>
            <HighlightedInformation>
                No hay partes en el sistema.
            </HighlightedInformation>
        </Box> 
    );

    const contentTable = (
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
                </Grid>
              </Paper>
            ))}
        </Box>
    );

    return (
        <Paper>
            <List>
                <Toolbar>
                    <ListItemText primary="Lista de partes" />
                    <Button variant="contained" color="secondary" disableElevation onClick={onNewButtonClick}>
                        Añadir parte
                    </Button>
                </Toolbar>
                <Divider/>
                <Box>
                    {orders.length ? contentTable : emptyTable }
                    <Pagination items={orders} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
                </Box>                
            </List>
        </Paper>    
    );
}

OrderTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrderTable);
