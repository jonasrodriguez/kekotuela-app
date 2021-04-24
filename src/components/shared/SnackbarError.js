import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function SnackbarError(props) {
    const { message, open, onClose } = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            onClose={onClose}
            autoHideDuration={6000}
        >
            <Alert severity="error">{message}</Alert>
        </Snackbar>
    );
  }

  SnackbarError.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
    onClose: PropTypes.func,
  };
  
  export default SnackbarError;