import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, TableCell, TablePagination, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import RowControls from "../shared/RowControls"
import EnhancedTableHead from "../shared/EnhancedTableHead";
import HighlightedInformation from "../shared/HighlightedInformation";

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
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
    id: "phone",
    label: "Telefono"
  },
  {
    id: "dni",
    label: "Documento Identidad"
  },
  {
    id: "city",
    label: "Ciudad"
  },
  {
    id: "actions",
  }
];

const rowsPerPage = 25;

function ClientTable(props) {
  const { classes, clients, filter, updateItem, deleteItem } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback((_, page) => { 
    setPage(page); 
  }, [setPage]);  

  if (!clients.length) {
    return (
      <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay clientes en el sistema.
        </HighlightedInformation>
      </Box> 
    );
  }
  return (
    <Box className={classes.tableWrapper}>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead rowCount={clients.length} rows={rows} />
        <TableBody>
          {clients
            .filter(user => { return user.name.toLowerCase().startsWith(filter) || user.surname.toLowerCase().startsWith(filter)
              || user.dni.toLowerCase().startsWith(filter) || user.phone.startsWith(filter) })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((client, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row" className={classes.firstData}>
                  {client.name + ' ' + client.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {client.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {client.dni}
                </TableCell>
                <TableCell component="th" scope="row">
                  {client.city}
                </TableCell>
                <TableCell component="th" scope="row">
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{"aria-label": "Previous Page"}}
        nextIconButtonProps={{"aria-label": "Next Page"}}
        onChangePage={handleChangePage}
        classes={{
          select: classes.dNone,
          selectIcon: classes.dNone,
          actions: clients.length > 0 ? classes.dBlock : classes.dNone,
          caption: clients.length > 0 ? classes.dBlock : classes.dNone
        }}
        labelRowsPerPage=""
      />
    </Box>
  );
}

ClientTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(ClientTable);
