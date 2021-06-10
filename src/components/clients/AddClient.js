import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import { Client } from '../shared/models/Models';
import { InsertClient, UpdateClient } from '../shared/api/Clients'
import AddItemCard from '../shared/AddItemCard'

function AddClient(props) {
  const { mainSnackBar, onClose, updateInfo } = props;
  const [client, setClient] = useState((updateInfo.update) ? updateInfo.client : Client);

  const handlePost = useCallback((response) => {
    if (response.status >= 200 && response.status < 300) {
      mainSnackBar({ text: "Cliente guardado correctamente.", isError: false});
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar el cliente!", isError: true});
    }
  }, [mainSnackBar, onClose]);

  const onValidation = () => {
    var correct = true;

    if (correct) {
      (updateInfo.update) 
        ? UpdateClient(client._id, client, handlePost)
        : InsertClient(client, handlePost);
    }
  }

  const content = (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={4}>
        <TextField label="Nombre" variant="outlined" fullWidth autoFocus required
          value={client.name} onChange={(event) => {setClient({...client, name: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Apellido" variant="outlined" fullWidth required
          value={client.surname} onChange={(event) => {setClient({...client, surname: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Segundo Apellido" variant="outlined" fullWidth
          value={client.second_surname} onChange={(event) => {setClient({...client, second_surname: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Nº Documento Identidad" variant="outlined" fullWidth required
          value={client.dni} onChange={(event) => {setClient({...client, dni: event.target.value})}} 
        />
      </Grid>   
      <Grid item xs={4}>
        <TextField label="Telefono" variant="outlined" fullWidth required
          value={client.phone} onChange={(event) => {setClient({...client, phone: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Email" variant="outlined" fullWidth required
          value={client.email} onChange={(event) => {setClient({...client, email: event.target.value})}} 
        />
      </Grid>        
      <Grid item xs={6}>
        <TextField label="Direccion" variant="outlined" fullWidth required
          value={client.address} onChange={(event) => {setClient({...client, address: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={2}>
        <TextField label="Codigo Postal" variant="outlined" fullWidth required
          value={client.cp} onChange={(event) => {setClient({...client, cp: event.target.value})}} 
        />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Ciudad" variant="outlined" fullWidth required
          value={client.city} onChange={(event) => {setClient({...client, city: event.target.value})}} 
        />
      </Grid>                
      <Grid item xs={8}>
        <TextField label="Comentarios" variant="outlined" fullWidth
          value={client.comments} onChange={(event) => {setClient({...client, comments: event.target.value})}} 
        />
      </Grid>        
    </Grid>  
  )

  return (
    <AddItemCard 
      title="Añadir cliente"
      content={content}      
      onOk={() => { onValidation() }}
      onCancel={onClose}
    />
  );
}

AddClient.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  mainSnackBar: PropTypes.func,
  updateInfo: PropTypes.object,
};

export default AddClient;