import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import HighlightedInformation from "../shared/HighlightedInformation"
import EnhancedTableHead from "../shared/EnhancedTableHead";
import Pagination from "../shared/Pagination";
import RowControls from "../shared/RowControls";

const styles = theme => ({
  contentWrapper: {
    padding: theme.spacing(3),
  },
});

const rows = [
    {
      id: "name",
      label: "Nombre"
    },
    {
      id: "reference",
      label: "Referencia"
    },
    {
      id: "cost",
      label: "Precio"
    },
    {
      id: "actions",
    },
];

function MaterialsTable(props) {
    const { classes, materials, filter, updateItem, deleteItem } = props;
    const [page, setPage] = useState({page:0, rowsPerPage:10});

    const onChangePage = useCallback((page) => { 
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
      <Box>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={materials.length} rows={rows} />
          <TableBody>
            {materials              
              .filter(mat => { return mat.name.toLowerCase().startsWith(filter) || mat.reference.toLowerCase().startsWith(filter) })
              .slice(page.page * page.rowsPerPage, page.page * page.rowsPerPage + page.rowsPerPage)
              .map((material, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row">
                  {material.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {material.reference}
                </TableCell>
                <TableCell component="th" scope="row">
                  {material.price} €
                </TableCell>                
                <TableCell component="th" scope="row">
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)}/>
                </TableCell>                               
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination items={materials} page={page} onChangePage={onChangePage} />
      </Box>    
    );
}

MaterialsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(MaterialsTable);
