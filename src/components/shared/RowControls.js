import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

function RowControls(props) {
  const { updateItem, deleteItem } = props;

  return (
    <ButtonGroup size="small">
      <Button variant="outlined" onClick={updateItem}>
        <CreateIcon fontSize="small" />
      </Button>
      <Button variant="outlined" onClick={deleteItem}>
        <DeleteIcon color="secondary" fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}

RowControls.propTypes = {
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default RowControls;
