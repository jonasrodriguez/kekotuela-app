import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box, Grid, TextField, Fab } from "@material-ui/core";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DateTimePicker from "../shared/DateTimePicker"
import ActionPaper from "../shared/ActionPaper";
import { formatDate } from "../shared/functions/formatDate"
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import { EmptyCliente } from '../shared/models/Client'
import { EmptyOrder } from '../shared/models/Order'
import { PostNewOrder } from '../shared/api/Order'
import ClientSearchSelect from './ClientSearchSelect'

function AddOrder(props) {
  const { pushMessageToSnackbar, onClose } = props;
  const order = EmptyOrder;
  const client = EmptyCliente;
  const [description, setDescription] = useState(order.description);
  const [priority, setPriority] = useState(order.priority.toString());
  const [showClientInfo, setShowClientInfo] = useState(false);  

  const handlePost = useCallback((response) => {
    console.log(response.json());
    onClose();
  }, [onClose]);

  const onPriorityChange = (event) => {    
    setPriority(event.target.value);
    order.priority = parseInt(event.target.value);
  }

  const onAssignedDate = (date) => {
    order.orderDate = date;
  }

  const onClearClient = () => {
    client.fillClientInfoFromDb(EmptyCliente);
    order.clientId = client.id;
    setShowClientInfo(false);
  }

  const onClientSelected = useCallback((newClient) => {    
    client.fillClientInfoFromDb(newClient);
    order.clientId = client.id;
    setShowClientInfo(true);    
  }, [client, setShowClientInfo]);

  const onDescriptionChanged = (event) => {
    setDescription(event.target.value);
    order.description = event.target.value;
  }

  const clientInfo = (
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
  );

  const clientSelection = (                   
    <Grid container spacing={2}>
      <Grid item>
        <ClientSearchSelect onClientSelected={onClientSelected} />
      </Grid>
      <Grid item>
        <Fab color="primary" size="medium" aria-label="add">
          <AddIcon />
        </Fab>  
      </Grid>
    </Grid>
  );   

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        content={          
          <Fragment>
            <Grid container spacing={2} justify="flex-start" >
              <Grid item xs={10}>
                <Typography variant="h6" gutterBottom>
                  Crear nuevo parte
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Fecha creación" value={formatDate(order.creationDate, true)} InputProps={{ readOnly: true, }} variant="outlined" />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardHeader subheader= "Cliente"/>
                  <CardContent>                    
                    {showClientInfo ? clientInfo : clientSelection }
                  </CardContent>
                </Card>                
              </Grid>
              <Grid item xs={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Prioridad</FormLabel>
                  <RadioGroup aria-label="Prioridad" name="priority" value={priority} onChange={onPriorityChange}>
                    <FormControlLabel value="2" control={<Radio />} label="Alta" />
                    <FormControlLabel value="1" control={<Radio />} label="Media" />
                    <FormControlLabel value="0" control={<Radio />} label="Baja" />
                  </RadioGroup>
                </FormControl>
              </Grid>   
              <Grid item xs={8}>
                <TextField label="Descripcion del parte" variant="outlined" value={description} onChange={onDescriptionChanged} 
                  multiline fullWidth={true}  rows={4} rowsMax={4} 
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
                        <DateTimePicker label="Fecha programada" value={order.orderDate} onChange={onAssignedDate}/>
                      </Grid>                                              
                    </Grid>                    
                  </CardContent>                  
                </Card>                
              </Grid>                                                           
            </Grid>                      
          </Fragment> 
        }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose}>
                Cancelar
              </Button>
            </Box>
            <Button
              onClick={ () => { PostNewOrder(order, handlePost) } }
              variant="contained"
              color="secondary">
              Guardar {<ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

AddOrder.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default AddOrder;