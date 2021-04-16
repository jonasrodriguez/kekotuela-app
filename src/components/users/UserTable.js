import React from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, TableCell, TableRow, withStyles } from "@material-ui/core";
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
    id: "userName",
    label: "Usuario"
  },
  {
    id: "name",
    label: "Nombre"
  },
  {
    id: "phone",
    label: "Telefono"
  },
  {
    id: "email",
    label: "Email"
  },
  {
    id: "admin",
    label: "Administrador"
  }
];

function UserTable(props) {
  const { users, classes } = props;

  if (!users.length) {
    return (
      <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay usuarios en el sistema.
        </HighlightedInformation>
      </Box> 
    );
  }
  return (
    <Box className={classes.tableWrapper}>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead rowCount={users.length} rows={rows} />
        <TableBody>
          {users
            .map((user, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row" className={classes.firstData}>
                  {user.userName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.name + ' ' + user.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.permissionLevel}
                </TableCell>                
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}

UserTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(UserTable);
