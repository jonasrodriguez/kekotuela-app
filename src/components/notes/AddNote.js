import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Grid, TextField, Fab, withStyles, FormControlLabel } from "@material-ui/core";
import { Dialog, Card, CardHeader, CardContent, CardActions, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import DateTimePicker from "../shared/DateTimePicker"
import { formatDate } from "../shared/functions/formatDate"
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import { Note, Client } from '../models/Models'
import { PostNewNote } from '../api/Notes'
import ClientSearchSelect from '../shared/ClientSearchSelect'
import AddClient from '../clients/AddClient'

const styles = ({
  mainCard: {    
    border: "none",  
    boxShadow: "none",
    padding: '10px'
  },
});

function AddClientDialog(props) {
  const { mainSnackBar, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <AddClient/>
    </Dialog>
  );
}

function AddNote(props) {
  const { classes, editNote, mainSnackBar, onClose } = props;
  const [note, setNote] = useState(Note);
  const [client, setClient] = useState(Client);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);  

  // If it's an edit, load the Note values
  /*if (editNote) {
    setNote(editNote);
    setClient(editNote.client);
  }*/

  const handlePost = useCallback((response) => {
    if (response.status === 200) {
      mainSnackBar({ text: "Nota guardada correctamente.", isError: false });
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar la nota!", isError: false });
    }
  }, [onClose]);

  const onClearClient = () => {
    setClient(Client);
    note.clientId = '';
    setShowClientInfo(false);
  }

  const onClientSelected = useCallback((newClient) => {
    setClient(newClient);
    note.clientId = newClient._id;
    setShowClientInfo(true);    
  }, [setClient, setShowClientInfo]);

  const clientInfo = (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="h5" component="h2">
              {client.name} {client.surname} {client.second_surname}          
            </Typography>
            <Typography variant="body2" component="p">
              {client.phone} - {client.email} <br/>
              {client.address}, {client.cp}, {client.city}
            </Typography>
          </Grid>
          <Grid item>
            <Fab size="small" color="primary" aria-label="delete" onClick={ () => { onClearClient() } }>
              <DeleteIcon />
            </Fab>
          </Grid>
        </Grid>
      </CardContent>    
    </Card>
  );

  const clientSelection = (                   
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <ClientSearchSelect onClientSelected={onClientSelected} />
      </Grid>
      <Grid item>
        <Typography>o bien</Typography>
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" size="large" onClick={()=>{setOpenClientDialog(true)}}>
          Alta cliente
        </Button>
      </Grid>
    </Grid>
  );   

  return (
    <Fragment>
      <Card className={classes.mainCard}>
        <CardHeader title="Crear nueva nota" titleTypographyProps={{variant:'h6'}} />
        <CardContent>
          <AddClientDialog open={openClientDialog}/>
          <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item xs={8}>
              <TextField label="Descripción" fullWidth={true} variant="outlined" />
            </Grid>
            <Grid item xs={4}/>
            <Grid item xs={3}>
              <TextField label="Fecha creación" value={formatDate(note.creationDate, true)} InputProps={{ readOnly: true, }} variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={ 
                  <Checkbox
                    checked={priority}
                    onChange={(ev) => {
                      setPriority(ev.target.checked);
                      note.priority = ev.target.checked;
                    }}
                    color="primary"
                  />
                }
                label="Prioritario"
              />
            </Grid>
            <Grid item xs={6}>
              {showClientInfo ? clientInfo : clientSelection }
            </Grid>                
            <Grid item xs={8}>
              <TextField label="Comentarios" variant="outlined" value={description} multiline fullWidth={true}  rows={4} rowsMax={4}
                  onChange={(event)=>{
                    setDescription(event.target.value);
                    note.description = event.target.value;
                }}
              />    
            </Grid>                       
            <Grid item xs={8}>
              <Card variant="outlined">
                <CardHeader subheader= "Programación"/>
                <CardContent>                   
                  <Grid container spacing={2}>
                    <Grid item xs={4}>                        
                      <TextField label="Operario asignado" defaultValue="" InputProps={{ readOnly: true, }} variant="outlined" />                       
                    </Grid> 
                    <Grid item xs={4}> 
                      <DateTimePicker label="Fecha programada" value={note.orderDate} 
                        onChange={date => note.orderDate = date}
                      />
                    </Grid>                                              
                  </Grid>                    
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
                onClick={ () => { PostNewNote(note, handlePost)}}
                variant="contained"
                color="secondary">
                Guardar {<ButtonCircularProgress />}
              </Button>            
            </Grid>          
          </Grid>
        </CardActions>
      </Card>      
    </Fragment>
  );
}

AddNote.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(AddNote);