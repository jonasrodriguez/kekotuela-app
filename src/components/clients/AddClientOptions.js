import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import StripeTextField from '../shared/StripeTextField'

const styles = (theme) => ({  
});

function AddClientOptions(props) {
  const { classes, client } = props; 

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [second_surname, setSecond] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cp, setCp] = useState("");
  const [city, setCity] = useState("");
  const [comments, setComments] = useState("");

  return (
    <Fragment>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={4}>
          <StripeTextField label="Nombre" value={client.name} setValue={setName} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Apellido" value={client.surname} setValue={setSurname} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Segundo Apellido" value={client.second_surname} setValue={setSecond} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Nº Documento Identidad" value={client.dni} setValue={setDni} />
        </Grid>   
        <Grid item xs={4}>
          <StripeTextField label="Telefono" value={client.phone} setValue={setPhone} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Email" value={client.email} setValue={setEmail} />
        </Grid>        
        <Grid item xs={6}>
          <StripeTextField label="Direccion" value={client.address} setValue={setAddress} />
        </Grid>
        <Grid item xs={2}>
          <StripeTextField label="Codigo Postal" value={client.cp} setValue={setCp} />
        </Grid>
        <Grid item xs={4}>
          <StripeTextField label="Ciudad" value={client.city} setValue={setCity} />
        </Grid>                
        <Grid item xs={8}>
          <StripeTextField label="Comentarios" value={client.comments} setValue={setComments} />
        </Grid>        
      </Grid>                      
    </Fragment>
  );
}

AddClientOptions.propTypes = {
    classes: PropTypes.object,
    client: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddClientOptions);
