import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, ListItemText } from "@material-ui/core";
import StripeTextField from '../shared/StripeTextField'

function AddClientOptions(props) {
  const { client, setParam } = props; 

  return (
    <Fragment>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={10}>
          <ListItemText primary="Añadir cliente" /*secondary="Premium Account"*/ />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Nombre" value={client.name} setValue={ (value) =>{ setParam("name", value) }} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Apellido" value={client.surname} setValue={(value) =>{ setParam("surname", value) }} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Segundo Apellido" value={client.second_surname} setValue={(value) =>{ setParam("second_surname", value) }} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Nº Documento Identidad" value={client.dni} setValue={(value) =>{ setParam("dni", value) }} />
        </Grid>   
        <Grid item xs={4}>
          <StripeTextField label="Telefono" value={client.phone} setValue={(value) =>{ setParam("phone", value) }} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Email" value={client.email} setValue={(value) =>{ setParam("email", value) }} />
        </Grid>        
        <Grid item xs={6}>
          <StripeTextField label="Direccion" value={client.address} setValue={(value) =>{ setParam("address", value) }} />
        </Grid>
        <Grid item xs={2}>
          <StripeTextField label="Codigo Postal" value={client.cp} setValue={(value) =>{ setParam("cp", value) }} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Ciudad" value={client.city} setValue={(value) =>{ setParam("city", value) }} />
        </Grid>                
        <Grid item xs={8}>
          <StripeTextField label="Comentarios" value={client.comments} setValue={(value) =>{ setParam("comments", value) }} />
        </Grid>        
      </Grid>                      
    </Fragment>
  );
}

AddClientOptions.propTypes = {
    classes: PropTypes.object,
    //client: PropTypes.object.isRequired,
    setParam: PropTypes.func.isRequired,    
};

export default AddClientOptions;
