import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Dropzone from "./Dropzone";

const styles = (theme) => ({
  uploadText: {
    transition: theme.transitions.create(["color", "box-shadow", "border"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
});

function PhotoSelector(props) {
  const { classes, mainSnackBar } = props;

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length + rejectedFiles.length > 1) {
        mainSnackBar({ text: "No se puede subir mas de un fichero a la vez", isError: true });
      } else if (acceptedFiles.length === 0) {
        mainSnackBar({ text: "El fichero que quiere subir no es una imagen", isError: true });
      } else if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        file.preview = URL.createObjectURL(file);
        file.key = new Date().getTime();
        //setCropperFile(file);
      }
    }, [mainSnackBar]
  );

  return (
    <Fragment>
      <Dropzone accept="image/png, image/jpeg" onDrop={onDrop} fullHeight>
        <span className={classes.uploadText}>
          Click / Drop file <br /> here
        </span>
      </Dropzone>
    </Fragment>
  );
}

PhotoSelector.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(PhotoSelector);