import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import RowControls from "../shared/RowControls";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import HighlightedInformation from "../shared/HighlightedInformation";
import Pagination from "../shared/Pagination";

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

function ClientTable(props) {
  const { classes, clients, filter, updateItem, deleteItem } = props;
  const [page, setPage] = useState({page:0, rowsPerPage:10});

  const onChangePage = useCallback((page) => { 
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
    <Box>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead rowCount={clients.length} rows={rows} />
        <TableBody>
          {clients
            .filter(user => { return user.name.toLowerCase().startsWith(filter) || user.surname.toLowerCase().startsWith(filter)
              || user.dni.toLowerCase().startsWith(filter) || user.phone.startsWith(filter) })
            .map((client, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row">
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
      <Pagination items={clients} page={page} onChangePage={onChangePage} />
    </Box>
  );
}

ClientTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(ClientTable);
