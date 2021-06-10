import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import { Material } from '../shared/models/Models'
import { InsertMaterial, UpdateMaterial } from '../shared/api/Materials'
import AddItemCard from '../shared/AddItemCard'


function AddMaterials(props) {
  const { mainSnackBar, onClose, updateInfo } = props;
  const [material, setMaterial] = useState((updateInfo.update) ? updateInfo.material : Material);

  const handlePost = useCallback((response) => {
    if (response.status >= 200 && response.status < 300) {
      mainSnackBar({ text: "Material guardado correctamente.", isError: false});
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar el material!", isError: true});
    }
  }, [mainSnackBar, onClose]);
  
  const onValidation = () => {
    var correct = true;

    if (correct) {
      (updateInfo.update) 
        ? UpdateMaterial(material._id, material, handlePost)
        : InsertMaterial(material, handlePost);
    }
  }

  const content = (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={3}>
        <TextField label="Nombre" variant="outlined" fullWidth autoFocus required
          value={material.name} onChange={(event) => {setMaterial({...material, name: event.target.value})}}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField label="Precio" variant="outlined" fullWidth required
          value={material.price} onChange={(event) => {setMaterial({...material, price: event.target.value})}}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField label="Referencia" variant="outlined" fullWidth required
          value={material.reference} onChange={(event) => {setMaterial({...material, reference: event.target.value})}}
        />
      </Grid>
      <Grid item xs={5}/>                          
      <Grid item xs={8}>
        <TextField label="Descripcion" variant="outlined" multiline fullWidth rows={4} rowsMax={4}
            value={material.description} onChange={(event) => {setMaterial({...material, description: event.target.value})}}
        />    
      </Grid>                     
    </Grid>   
  );

  return (
    <AddItemCard 
      title="Añadir material"
      content={content}      
      onOk={() => { onValidation() }}
      onCancel={onClose}
    />
  );
}

AddMaterials.propTypes = {
  onClose: PropTypes.func,
  mainSnackBar: PropTypes.func,
};

export default AddMaterials;