import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import MaterialSelector from './MaterialSelector';
import PhotoSelector from '../shared/PhotoSelector';
import SignatureCanvas from "../shared/SignatureCanvas";
import { InsertOrder, UpdateOrder } from '../shared/api/Orders';
import { Order } from "../shared/models/Models";
import AddItemCard from '../shared/AddItemCard';
import NoteSelector from './NoteSelector';
import LaborerSelector from './LaborerSelector';
import ServiceSelector from './ServiceSelector';

function AddOrder(props) {
  const { onClose, mainSnackBar, updateInfo } = props;
  const [order, setOrder] = useState((updateInfo.update) ? updateInfo.order : Order);
  const [materials, setMaterials] = useState((updateInfo.update) ? updateInfo.order.materials : []);
  const [services, setServices] = useState((updateInfo.update) ? updateInfo.order.services : []);
  const [laborers, setLaborers] = useState((updateInfo.update) ? updateInfo.order.laborers : []);

  const onNoteSelected = useCallback((note) => {
    setOrder({...order, note: { reference: note.reference, description: note.description }, client: note.client });
  }, [order])
  
  const onUpdateServices = useCallback((services) => {
    setOrder({...order, services: services});
    setServices(services);
  }, [order, setServices])

  const onUpdateLaborers = useCallback((laborers) => {
    setOrder({...order, laborers: laborers});
    setLaborers(laborers);
  }, [order, setLaborers])

  const onUpdateMaterials = useCallback((materials) => {
    setOrder({...order, materials: materials});
    setMaterials(materials);
  }, [order, setMaterials])

  const handlePost = useCallback((response) => {
    if (response.status === 200) {
      mainSnackBar({ text: "Orden guardada correctamente.", isError: false});
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar la nota!", isError: true});
    }
  }, [mainSnackBar, onClose]);

  const onValidation = () => {
    var correct = true;

    if (correct) {
      (updateInfo.update) 
        ? UpdateOrder(order._id, order, handlePost)
        : InsertOrder(order, handlePost);
    }
  }  

  const content = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NoteSelector order={order} onUpdateNote={onNoteSelected} updateInfo={updateInfo} />
      </Grid>
      <Grid item xs={6}>
        <LaborerSelector laborers={laborers} onUpdateLaborers={onUpdateLaborers} />
      </Grid>
      <Grid item xs={5}>
        <ServiceSelector services={services} onUpdateServices={onUpdateServices} />
      </Grid>            
      <Grid item xs={10}>
        <MaterialSelector materials={materials} onUpdateMaterials={onUpdateMaterials} />
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
      <Grid item xs={1}/>
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardHeader subheader= "Firma cliente"/>
          <CardContent>
            <SignatureCanvas />
          </CardContent>
        </Card>
      </Grid>                                          
    </Grid>
  );

  return (
    <AddItemCard 
      title="Añadir parte"
      content={content}      
      onOk={() => { onValidation() }}
      onCancel={onClose}
    />
  );
}

AddOrder.propTypes = {
  onClose: PropTypes.func,
  mainSnackBar: PropTypes.func,
};

export default AddOrder;
