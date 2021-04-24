import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Box, Grid, TextField, Typography, Snackbar } from "@material-ui/core";
import ActionPaper from "../shared/ActionPaper";
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import SnackbarError from "../shared/SnackbarError";
import { EmptyMaterial } from '../models/Material'
import { PostNewMaterial } from '../api/Material'

function AddMaterials(props) {
  const { parentSnackbar, onClose } = props;
  const material = EmptyMaterial;
  const [errorSnack, setErrorSnack] = useState(false);
  const [name, setName] = useState(material.name);
  const [price, setPrice] = useState(material.price);
  const [description, setDescription] = useState(material.description);
  const [reference, setReference] = useState(material.reference);

  const handlePost = useCallback((response) => {    
    material.clearMaterial();
    parentSnackbar.message="Material añadido correctamente."
    parentSnackbar.open=true
    onClose();
  }, [onClose]); 
  
  return (
    <Fragment>
      <ActionPaper
        helpPadding
        content={          
          <Fragment>
            <Grid container spacing={2} justify="flex-start" >
              <Grid item xs={10}>
                <Typography variant="h6" gutterBottom>
                  Añadir material
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Nombre" variant="outlined" value={name} 
                  onChange={(event) =>{setName(event.target.value); material.name = event.target.value;}} 
                />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Precio" variant="outlined" value={price} 
                  onChange={(event) =>{setPrice(event.target.value); material.price = event.target.value;}}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Referencia" variant="outlined" value={reference} 
                  onChange={(event) =>{setReference(event.target.value); material.reference = event.target.value;}}
                />
              </Grid>
              <Grid item xs={6}/>                          
              <Grid item xs={8}>
                <TextField label="Descripcion" variant="outlined" value={description}
                  multiline fullWidth={true}  rows={4} rowsMax={4} 
                  onChange={(event) =>{setDescription(event.target.value);  material.description = event.target.value;}}
                />    
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
              onClick={ () => { PostNewMaterial(material, handlePost) } }
              variant="contained"
              color="secondary">
              Guardar {<ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
      <SnackbarError message="Error al guardar el material!" open={errorSnack} onClose={()=>{setErrorSnack(false);}}/>
    </Fragment>
  );
}

AddMaterials.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default AddMaterials;