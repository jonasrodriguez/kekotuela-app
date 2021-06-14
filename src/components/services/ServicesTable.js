import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import RowControls from "../shared/RowControls"
import AddItem from "./AddItem"
import { InsertService, UpdateService } from "../shared/api/Services"

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
      id: "actions",
    },
];

const emptyUpdate = {update:false, id:'', name:'', price:0}

function ServicesTable(props) {
    const { classes, services, mainSnackBar, filter, updateContent, deleteItem } = props;
    const [updateItem, setUpdateItem] = useState(emptyUpdate);
    const [updateRow, setUpdateRow] = useState(-1);

    const onAdd = (id, service) => {
      service.type = 'service';
      (updateItem.update) ? UpdateService(id, service, handlePost)
        : InsertService(service, handlePost);
    }

    const onCancel = useCallback(() => {
      setUpdateRow(-1);
    }, [setUpdateRow])

    const onUpdate = (index) => {
      const service = services[index];
      setUpdateItem({update:true, id:service._id, name:service.name, price:service.price});
      setUpdateRow(index);
    }

    const handlePost = useCallback((response) => {
      if (response.status >= 200 && response.status < 300) {
        mainSnackBar({ text: "Servicio guardado correctamente.", isError: false});
        setUpdateItem(emptyUpdate);
        setUpdateRow(-1);
        updateContent();
      }
      else {
        mainSnackBar({ text: "Error al guardar el Servicio!", isError: true});
      }
    }, [mainSnackBar, updateContent]);

    const readRowData = (service, index) => {
      return (
        <TableRow hover tabIndex={-1} key={index}>
          <TableCell component="th" scope="row" className={classes.firstData}>
            {service.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {service.price} €
          </TableCell>
          <TableCell component="th" scope="row">
            <RowControls updateItem={() => onUpdate(index)} deleteItem={() => deleteItem(index)}/>
          </TableCell>
        </TableRow> 
      );
    };

    return (
      <Box className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={services.length} rows={rows} />
          <TableBody>
            {services
              .filter(mat => { return mat.name.toLowerCase().startsWith(filter) })
              .map((service, index) => (
                (updateRow === index) ? <AddItem index={index} updateItem={updateItem} onSave={onAdd} onCancel={onCancel} /> : readRowData(service, index)
            ))}
            <AddItem index={services.length + 1} updateItem={updateItem} onSave={onAdd} onCancel={onCancel} />
        </TableBody>
        </Table>
      </Box>    
    );
}

ServicesTable.propTypes = {
    classes: PropTypes.object.isRequired,
    mainSnackBar: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
};

export default withStyles(styles)(ServicesTable);
