import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles
} from "@material-ui/core";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import ColorfulChip from "../shared/ColorfulChip";
import HighlightedInformation from "../shared/HighlightedInformation";
import unixToDateString from "../shared/functions/unixToDateString";
import currencyPrettyPrint from "../shared/functions/currencyPrettyPrint";

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
    numeric: false,
    label: "Nombre"
  },
  {
    id: "phone",
    numeric: false,
    label: "Telefono"
  },
  {
    id: "date",
    numeric: false,
    label: "Date"
  },
  {
    id: "paidUntil",
    numeric: false,
    label: "Paid until"
  }
];

const rowsPerPage = 25;

function ClientTable(props) {
  const { clients, theme, classes } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  if (clients.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={clients.length} rows={rows} />
          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((clients, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {clients.name + ' ' + clients.surname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {clients.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {unixToDateString(clients.timestamp)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {clients.paidUntil
                      ? unixToDateString(clients.paidUntil)
                      : ""}
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
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: clients.length > 0 ? classes.dBlock : classes.dNone,
            caption: clients.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No hay clientes en el sistema.
      </HighlightedInformation>
    </div>
  );
}

ClientTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(ClientTable);
