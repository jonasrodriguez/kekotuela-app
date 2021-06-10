import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Grid, TextField, Fab, FormControlLabel } from "@material-ui/core";
import { Dialog, Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import esLocale from "date-fns/locale/es";
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import DeleteIcon from '@material-ui/icons/Delete';
import { Note, Client } from '../shared/models/Models'
import { InsertNote, UpdateNote } from '../shared/api/Notes'
import ClientSearchSelect from '../shared/ClientSearchSelect'
import UserSearchSelect from '../shared/UserSearchSelect'
import AddClient from '../clients/AddClient'
import AddItemCard from '../shared/AddItemCard'

function AddNote(props) {
  const { mainSnackBar, onClose, updateInfo } = props;
  const [note, setNote] = useState((updateInfo.update) ? updateInfo.note : Note);
  const [showClientInfo, setShowClientInfo] = useState((updateInfo.update) ? true : false);
  const [openClientDialog, setOpenClientDialog] = useState(false);  

  const handlePost = useCallback((response) => {
    if (response.status === 200) {
      mainSnackBar({ text: "Nota guardada correctamente.", isError: false });
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar la nota!", isError: true });
    }
  }, [mainSnackBar, onClose]);

  const onClientSelected = useCallback((client) => {
    setNote({...note, client: client});
    setShowClientInfo(true);    
  }, [note, setNote, setShowClientInfo]);

  const onClearClient = useCallback(() => {
    setNote({...note, client: Client});
    setShowClientInfo(false);
  }, [note, setNote, setShowClientInfo]);

  const onUserSelected = useCallback((userSelected) => {
    setNote({...note, scheduledUser: userSelected.userName});
  }, [note, setNote]);

  const onValidation = () => {
    var correct = true;

    if (correct) {
      (updateInfo.update) 
        ? UpdateNote(note._id, note, handlePost)
        : InsertNote(note, handlePost);
    }
  }

  const clientDialog = (open, close) => {
    return (
      <Dialog open={open} onClose={close} >
        <AddClient/>
      </Dialog>
    );
  }

  const clientInfo = (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="h5" component="h2">
              {note.client.name} {note.client.surname} {note.client.second_surname}          
            </Typography>
            <Typography variant="body2" component="p">
              {note.client.phone} - {note.client.email} <br/>
              {note.client.address}, {note.client.cp}, {note.client.city}
            </Typography>
          </Grid>
          <Grid item>
            <Fab size="small" color="secondary" aria-label="delete" onClick={ () => { onClearClient() } }>
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

  const content = (
    <Fragment>
      {clientDialog(openClientDialog, openClientDialog)}
      <Grid container spacing={2} justify="flex-start" alignItems="center">
        <Grid item xs={6}>
          <TextField label="Descripción" variant="outlined" fullWidth 
            value={note.description} onChange={(event) => {setNote({...note, description: event.target.value})}}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            label="Prioritario"
            control={ <Checkbox color="primary" checked={note.priority} onChange={(event) => {setNote({...note, priority: event.target.checked})}} /> }
          />
        </Grid>       
        <Grid item xs={6}>
          {showClientInfo ? clientInfo : clientSelection }
        </Grid>                
        <Grid item xs={8}>
          <TextField label="Comentarios" variant="outlined" multiline fullWidth={true}  rows={4} rowsMax={4}
            value={note.comments} onChange={(event) => {setNote({...note, comments: event.target.value})}}
          />    
        </Grid>                       
        <Grid item xs={8}>
          <Card variant="outlined">
            <CardHeader subheader= "Programación"/>
            <CardContent>                   
              <Grid container spacing={2}>
                <Grid item xs={4}>                        
                  <UserSearchSelect onOptionSelected={onUserSelected}/>
                </Grid> 
                <Grid item xs={4}> 
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                    <DateTimePicker
                      label="Fecha programada"
                      value={note.scheduledDate}
                      onChange={(newValue) => {setNote({...note, scheduledDate: newValue});}}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>                                              
              </Grid>                    
            </CardContent>                  
          </Card>                
        </Grid>
      </Grid>
    </Fragment>
  )

  return (
    <AddItemCard 
      title="Añadir nota"
      content={content}      
      onOk={() => { onValidation() }}
      onCancel={onClose}
    />    
  );
}

AddNote.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default AddNote;
