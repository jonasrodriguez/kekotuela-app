import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Fab, withStyles } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardActions, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import NoteSearchSelect from "../shared/NoteSearchSelect"
import MaterialSelector from './MaterialSelector'
import PhotoSelector from '../shared/PhotoSelector'
import SignatureCanvas from "../shared/SignatureCanvas"
import { PostNewOrder } from "../api/Order"
import { Client, Order, Note } from "../models/Models"

const styles = ({
  mainCard: {    
    border: "none",  
    boxShadow: "none",
    padding: '10px'
  },
});

function AddOrder(props) {
  const { classes, onClose, mainSnackBar } = props;
  const [order, setOrder] = useState(Order);
  const [note, setNote] = useState(Note);
  const [client, setClient] = useState(Client);
  const [total, setTotal] = useState(0);
  const [materialList, setMaterialList] = useState([]);
  const [showNoteInfo, setShowNoteInfo] = useState(false);

  const onNoteSelected = useCallback((selectedNote) => {    
    setNote(selectedNote);
    setClient(selectedNote.client)
    order.noteId = selectedNote._id;
    setShowNoteInfo(true);    
  }, [note, setShowNoteInfo]);

  const onClearNote = () => {
    setNote(Note);
    setClient(Client)
    order.noteId = null;
    setShowNoteInfo(false);
  }

  const saveMaterials = useCallback((materials, total) => {
    order.materials = materials;
    order.total = total;
  }, [order])

  const handlePost = useCallback((response) => {
    if (response.status === 200) {
      mainSnackBar({ text: "Orden guardada correctamente.", isError: false});
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar la nota!", isError: true});
    }
  }, [onClose]);

  const NoteDetails = (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5" component="h2">
          {note.description}
        </Typography>                 
        <Typography variant="body2" component="p">
        Ref. {note.reference} <br/> {note.comments}
        </Typography>            
      </Grid>
      <Grid item xs={4}>                  
        <Typography variant="h5" component="h2">
          {client.name} {client.surname} {client.second_surname}          
        </Typography>
        <Typography variant="body2" component="p">
          {client.phone} - {client.email} <br/>
          {client.address}, {client.cp}, {client.city}
        </Typography>
      </Grid>
      <Grid item>
        <Fab size="small" color="primary" aria-label="delete" onClick={ () => { onClearNote() } }>
          <DeleteIcon />
        </Fab>
      </Grid>    
    </Grid>
  );

  const noteSelection = (                   
    <Grid container>
      <Grid item>
        <NoteSearchSelect onNoteSelected={onNoteSelected} />
      </Grid>
    </Grid>
  ); 

  return (
    <Card className={classes.mainCard}>
      <CardHeader title="Crear nuevo albaran" titleTypographyProps={{variant:'h6'}} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader subheader= "Nota"/>
              <CardContent>                    
                {showNoteInfo ? NoteDetails : noteSelection}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <MaterialSelector materialList={note.materials} saveMaterials={saveMaterials} />
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader subheader= "Fotos antes"/>
              <CardContent>
                <PhotoSelector mainSnackBar={mainSnackBar}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader subheader= "Fotos despues"/>
              <CardContent>                    
                <PhotoSelector mainSnackBar={mainSnackBar}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardHeader subheader= "Firma operario"/>
              <CardContent>
                <SignatureCanvas />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}/>
          <Grid item xs={3}>
            <Card variant="outlined">
              <CardHeader subheader= "Firma cliente"/>
              <CardContent>
                <SignatureCanvas />
              </CardContent>
            </Card>
          </Grid>                                          
        </Grid>          
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <Button onClick={onClose}>
              Cancelar
            </Button>             
          </Grid>
          <Grid item>
            <Button
              onClick={ () => { PostNewOrder(order, handlePost) } }
              variant="contained"
              color="secondary">
              Guardar {<ButtonCircularProgress />}
            </Button>            
          </Grid>          
        </Grid>
      </CardActions>
    </Card>
  );
}

AddOrder.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(AddOrder);