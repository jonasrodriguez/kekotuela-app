import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import HighlightedInformation from "../shared/HighlightedInformation"
import EnhancedTableHead from "../shared/EnhancedTableHead";
import Pagination from "../shared/Pagination"
import RowControls from "../shared/RowControls"

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
    },
    {
      id: "actions",
    },
];

const rowsPerPage = 25;

function MaterialsTable(props) {
    const { classes, materials, filter, updateItem, deleteItem } = props;
    const [page, setPage] = useState(0);

    const handleChangePage = useCallback((_, page) => { 
        setPage(page); 
    }, [setPage]);    

    if (!materials.length) {
      return (
        <Box className={classes.contentWrapper}>
          <HighlightedInformation>
            No hay materiales en el sistema.
          </HighlightedInformation>
        </Box> 
      );
    }

    return (
      <Box className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={materials.length} rows={rows} />
          <TableBody>
            {materials
              .filter(mat => { return mat.name.toLowerCase().startsWith(filter) || mat.reference.toLowerCase().startsWith(filter) })
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
                <TableCell component="th" scope="row">
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)}/>
                </TableCell>                               
              </TableRow>
            ))}
            </TableBody>
          </Table>
        <Pagination items={materials} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
      </Box>    
    );
}

MaterialsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(MaterialsTable);
