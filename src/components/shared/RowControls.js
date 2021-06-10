import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ButtonGroup, IconButton } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

function RowControls(props) {
  const { updateItem, deleteItem } = props;

  return (
    <Fragment>
      <ButtonGroup variant="contained" size="small">
        <IconButton onClick={updateItem}>
          <CreateIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={deleteItem}>
          <DeleteIcon color="secondary" fontSize="small" />
        </IconButton>
      </ButtonGroup>
    </Fragment>
  );
}

RowControls.propTypes = {
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default RowControls;
