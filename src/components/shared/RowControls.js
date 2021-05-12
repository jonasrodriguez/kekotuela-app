import React from "react";
import PropTypes from "prop-types";
import { IconButton, Box, Divider } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

function RowControls(props) {
  const { updateItem, deleteItem } = props;

  return (
    <Box>
      <IconButton aria-label="Update Item" onClick={updateItem}>
        <CreateIcon />
      </IconButton>
      <Divider />      
      <IconButton color="primary" aria-label="Delete Item" onClick={deleteItem}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

RowControls.propTypes = {
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default RowControls;
