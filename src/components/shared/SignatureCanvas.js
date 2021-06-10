import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas"
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";

const styles = {
  sigImage: {
    backgroundSize: "200px 50px",
    width: "200px",
    height: "50px",
    backgroundColor: "white"
  }
};

function SignatureDialog(props) {
  const { open, onClose, setImageURL } = props;
  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    setImageURL(sigCanvas.current.toDataURL("image/png"));
    onClose();
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle>
        Firme aqui:
      </DialogTitle>
      <DialogContent dividers>
        <Box border={1}>
          <SignaturePad ref={sigCanvas} canvasProps={{ width: 500, height: 200, className: "signatureCanvas" }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={save}> Guardar </Button>
        <Button variant="outlined" onClick={clear}> Borrar </Button>
        <Button variant="outlined" onClick={onClose}> Cancelar </Button>
      </DialogActions>      
    </Dialog>
  );
}

function SignatureCanvas(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const onClose = () => {
    setOpen(false);
  };

  const insertSign = (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}> Añadir firma </Button>
      <SignatureDialog open={open} onClose={onClose} setImageURL={setImageURL}/>
    </div>
  );

  return (
    <Box>
      {(imageURL) ? <img alt="Firma" className={classes.sigImage} src={imageURL} /> : insertSign }
    </Box>
  );
}

export default withStyles(styles)(SignatureCanvas);
