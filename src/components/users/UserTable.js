import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import HighlightedInformation from "../shared/HighlightedInformation";
import RowControls from "../shared/RowControls"
import Pagination from "../shared/Pagination";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  contentWrapper: {
    padding: theme.spacing(3),
  },
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
  },
  {
    id: "actions"
  }
];

function UserTable(props) {
  const { classes, users, filterUsers, updateItem, deleteItem } = props;
  const [page, setPage] = useState({page:0, rowsPerPage:10});

  const onChangePage = useCallback((page) => { 
    setPage(page); 
  }, [setPage]);

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
    <Box>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead rowCount={users.length} rows={rows} />
        <TableBody>
          {users
            .filter(user => { return user.userName.startsWith(filterUsers) || user.name.startsWith(filterUsers) || user.surname.startsWith(filterUsers)
              || user.email.startsWith(filterUsers) || user.phone.startsWith(filterUsers) })
            .map((user, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row">
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
                <TableCell component="th" scope="row" style={{ verticalAlign: 'bottom' }}>
                  {(user.permissionLevel === 1) ? <CheckIcon fontSize="small" /> : <CloseIcon fontSize="small" /> }
                </TableCell>
                <TableCell component="th" scope="row">
                  <RowControls updateItem={() => updateItem(index)} deleteItem={() => deleteItem(index)} />
                </TableCell>                 
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination items={users} page={page} onChangePage={onChangePage} />
    </Box>
  );
}

UserTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserTable);
