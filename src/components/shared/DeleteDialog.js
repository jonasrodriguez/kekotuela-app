import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog(props) {
  const { mainSnackBar, onClose, deleteItem, apiCall } = props;  

  const onDelete = () => {
    apiCall(deleteItem.id, deleteHandle);
  }

  const deleteHandle = (response) => {
    if (response.status >= 200 && response.status < 300) {
      mainSnackBar({ text: "Eliminado correctamente.", isError: false, });
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al eliminar.", isError: true, });
    }
  }

  return (
    <Dialog open={deleteItem.open} TransitionComponent={Transition} keepMounted onClose={onClose}
        aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Eliminar " + deleteItem.name + "?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {"Está seguro que desea eliminar " + deleteItem.message+ "?"} <br/>
          {"Esta operación no puede deshacerse."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} color="primary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>   
  );
}
