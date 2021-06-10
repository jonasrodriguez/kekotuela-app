import React, { useState } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, TextField, ButtonGroup, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

function AddItem (props) {
  const { index, updateItem, onSave, onCancel } = props;

  const [name, setName] = useState((updateItem.update) ? updateItem.name : '');
  const [price, setPrice] = useState((updateItem.update) ? updateItem.price : '');

  const onSaveClick = () => {
    onSave(updateItem.id, {"name":name, "price":price, "type":"" });
    setName('');
    setPrice('');
  }

  const onClear = () => {
    setName('');
    setPrice('');
    if (updateItem.update) {
       onCancel();
    }
  }

  return (
    <TableRow hover key={index}>
      <TableCell component="th" scope="row">
        <TextField size="small" variant="standard" value={name} onChange={(event) => {setName(event.target.value)}} />
      </TableCell>
      <TableCell component="th" scope="row">
        <TextField type="number" size="small" variant="standard" value={price} onChange={(event) => {setPrice(event.target.value)}} />
      </TableCell>
      <TableCell component="th" scope="row">
        <ButtonGroup variant="contained" size="small">
          <IconButton onClick={onSaveClick}>
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onClear}>
            <CancelIcon color="secondary" fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </TableCell>                               
    </TableRow>
  );
}

AddItem.propTypes = {
  index: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AddItem;