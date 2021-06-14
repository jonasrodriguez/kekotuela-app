import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableRow, TableBody, TableCell, TextField, ButtonGroup, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from "@material-ui/styles";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import RowControls from "../shared/RowControls";
import { UpdateUser } from "../shared/api/Users";

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
      label: "Precio / hora"
    },
    {
      id: "actions",
    },
];

function LaborersTable(props) {
  const { classes, laborers, mainSnackBar, filter, updateLaborer, deleteItem } = props;
  const[laborer, setLaborer] = useState(null);
  const[updateRow, setUpdateRow] = useState(-1);

  const handlePost = useCallback((response) => {
    if (response.status >= 200 && response.status < 300) {
      mainSnackBar({ text: "Servicio guardado correctamente.", isError: false});
      setUpdateRow(-1);
      updateLaborer();
    }
    else {
      mainSnackBar({ text: "Error al guardar el Servicio!", isError: true});
    }
  }, [mainSnackBar, updateLaborer]);


  const onUpdateLaborer = useCallback(() => {
    UpdateUser(laborer._id, laborer, handlePost);
  }, [laborer, handlePost]);

  const onCancel = useCallback(() => {
    setUpdateRow(-1);
  }, [setUpdateRow])

  const onUpdateRow = (index) => {
    setLaborer(laborers[index]);
    setUpdateRow(index);
  }

  const readRowData = (user, index) => {
    return (
      <TableRow hover tabIndex={-1} key={index}>
        <TableCell component="th" scope="row" className={classes.firstData}>
          {user.name + ' ' + user.surname}
        </TableCell>
        <TableCell component="th" scope="row">
          {user.costHour} €
        </TableCell>
        <TableCell component="th" scope="row">
          <RowControls updateItem={() => onUpdateRow(index)} deleteItem={() => deleteItem(index)}/>
        </TableCell>
      </TableRow> 
    );
  };

  const updateRowData = (index) => {
    return (
      <TableRow hover key={index}>
        <TableCell component="th" scope="row" className={classes.firstData}>
          {laborer.name + ' ' + laborer.surname}
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField type="number" size="small" variant="standard" value={laborer.costHour} onChange={(event) => {setLaborer({...laborer, costHour: event.target.value})}} />
        </TableCell>
        <TableCell component="th" scope="row">
          <ButtonGroup variant="contained" size="small">
            <IconButton onClick={onUpdateLaborer}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onCancel}>
              <CancelIcon color="secondary" fontSize="small" />
            </IconButton>
          </ButtonGroup>
        </TableCell>                               
      </TableRow>
    );
  }

  return (
    <Box className={classes.tableWrapper}>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead rowCount={laborers.length} rows={rows} />
        <TableBody>
          {laborers
            .filter(mat => { return mat.name.toLowerCase().startsWith(filter) })
            .map((service, index) => (
              (updateRow === index) ? updateRowData(index) : readRowData(service, index)
          ))}
        </TableBody>
      </Table>
    </Box>    
  );
}

LaborersTable.propTypes = {
    classes: PropTypes.object.isRequired,
    mainSnackBar: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateLaborer: PropTypes.func.isRequired,
};

export default withStyles(styles)(LaborersTable);
