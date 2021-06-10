import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

function ConsecutiveSnackbars(props) {
  const { classes, getMessageToSnackBar } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState({});
  
  const queue = useRef([]);

  const processQueue = useCallback(() => {
    if (queue.current.length > 0) {
      setMessageInfo(queue.current.shift());
      setIsOpen(true);
    }
  }, [setMessageInfo, setIsOpen, queue]);

  const handleClose = useCallback((_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  }, [setIsOpen]);

  const pushMessage = useCallback(message => {
    queue.current.push({ key: new Date().getTime(), message });
    if (isOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      setIsOpen(false);
    } else {
      processQueue();
    }
  }, [queue, isOpen, setIsOpen, processQueue]);

  useEffect(() => { getMessageToSnackBar(pushMessage);
  }, [getMessageToSnackBar, pushMessage]);

  const isError =  messageInfo.message ? messageInfo.message.isError : true;
  const messageText = messageInfo.message ? messageInfo.message.text : null;

  const errorBar = (<Alert severity="error">{messageText}</Alert>);
  const successBar = (<Alert severity="success">{messageText}</Alert>);

  return (
    <Snackbar
      disableWindowBlurListener
      key={messageInfo.key}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      onExited={processQueue}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}>
        {isError ? errorBar : successBar}
      </Snackbar>
  );
}

ConsecutiveSnackbars.propTypes = {
  getPushMessageFromChild: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ConsecutiveSnackbars);
