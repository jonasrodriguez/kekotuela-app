import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, List, ListItemText, Toolbar, Paper, withStyles } from "@material-ui/core";
import { Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import HighlightedInformation from "../shared/HighlightedInformation"
import EnhancedTableHead from "../shared/EnhancedTableHead";
import Pagination from "../shared/Pagination"

const styles = theme => ({
    tableWrapper: {
        width: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
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
    firstData: {
        paddingLeft: theme.spacing(3)
    },
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.26)"
    }
});

const rows = [
    {
      id: "name",
      label: "Nombre"
    },
    {
      id: "date",
      label: "Precio"
    },
    {
      id: "city",
      label: "Referencia"
    }
];

const rowsPerPage = 25;

function MaterialsTable(props) {
    const { classes, materials, onNewButtonClick } = props;
    const [page, setPage] = useState(0);

    const handleChangePage = useCallback((_, page) => { 
        setPage(page); 
    }, [setPage]);

    const emptyTable = (
        <Box className={classes.contentWrapper}>
            <HighlightedInformation>
                No hay materiales en el sistema.
            </HighlightedInformation>
        </Box> 
    );

    const contentTable = (
        <TableBody>
        {materials
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((material, index) => (
            <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row" className={classes.firstData}>
                {material.name}
                </TableCell>
                <TableCell component="th" scope="row">
                {material.price}
                </TableCell>
                <TableCell component="th" scope="row">
                {material.reference}
                </TableCell>                                
            </TableRow>
            ))}
        </TableBody> 
    );

    return (
        <Paper>
            <List disablePadding>
                <Toolbar className={classes.toolbar}>
                    <ListItemText primary="Lista de materiales" />
                    <Button variant="contained" color="secondary" disableElevation onClick={onNewButtonClick}>
                        Añadir material
                    </Button>
                </Toolbar>
                <Divider className={classes.divider} />
                <Box className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle">
                        <EnhancedTableHead rowCount={materials.length} rows={rows} />
                        {materials.length ? contentTable : emptyTable }
                    </Table>
                    <Pagination items={materials} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
                </Box>                
            </List>
        </Paper>    
    );
}

MaterialsTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterialsTable);
