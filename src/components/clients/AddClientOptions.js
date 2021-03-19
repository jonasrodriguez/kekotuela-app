import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import StripeTextField from '../shared/StripeTextField'

function AddClientOptions(props) {
  const { classes, client, setClient } = props; 

  return (
    <Fragment>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={4}>
          <StripeTextField label="Nombre" value={client.name} setValue={ (value) =>{ client.name = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Apellido" value={client.surname} setValue={(value) =>{ client.surname = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Segundo Apellido" value={client.second_surname} setValue={(value) =>{ client.second_surname = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Nº Documento Identidad" value={client.dni} setValue={(value) =>{ client.dni = value }} onChange={setClient(client)} />
        </Grid>   
        <Grid item xs={4}>
          <StripeTextField label="Telefono" value={client.phone} setValue={(value) =>{ client.phone = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Email" value={client.email} setValue={(value) =>{ client.email = value }} onChange={setClient(client)} />
        </Grid>        
        <Grid item xs={6}>
          <StripeTextField label="Direccion" value={client.address} setValue={(value) =>{ client.address = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={2}>
          <StripeTextField label="Codigo Postal" value={client.cp} setValue={(value) =>{ client.cp = value }} onChange={setClient(client)} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Ciudad" value={client.city} setValue={(value) =>{ client.city = value }} onChange={setClient(client)} />
        </Grid>                
        <Grid item xs={8}>
          <StripeTextField label="Comentarios" value={client.comments} setValue={(value) =>{ client.comments = value }} onChange={setClient(client)} />
        </Grid>        
      </Grid>                      
    </Fragment>
  );
}

AddClientOptions.propTypes = {
    classes: PropTypes.object,
    client: PropTypes.object.isRequired,
    setClient: PropTypes.func.isRequired,
};

export default AddClientOptions;
