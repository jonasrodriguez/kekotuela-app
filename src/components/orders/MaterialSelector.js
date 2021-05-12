import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, CardActions, Fab, TextField, Typography, Grid, InputAdornment } from "@material-ui/core";
import { FormControl , InputLabel, OutlinedInput } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialSearchSelect from '../shared/MaterialSearchSelect';

function MaterialSelector(props) {
  const { materialList, saveMaterials } = props;
  const [materials, setMaterials] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  // Load parent materialList
  /*if (materialList) {
    setMaterialList(materialList);
  }*/

  const onMaterialSelected = useCallback((selectedMat) => {
    if (selectedMat) {
      selectedMat.quantity = 0;
      selectedMat.total = 0;
      setMaterials([...materials, selectedMat]);
    }
  }, [materials]);

  const onClearMaterial = (idx) => {
    setMaterials(materials.filter((item, index) => index !== idx));
  }

  const onUpdateQuantity = (event, idx) => {
    
    const total = event.target.value * materials[idx].price;
    let mats = materials.map((m, index) => {
      var mat = {...m};    
      if (index === idx) {
        mat.quantity = event.target.value;
        mat.total = total;
      }    
      return mat
    })
    setMaterials(mats);    
  }

  const calculateGrandTotal = () => {    
    let total = 0;
    materials.forEach(m => {
      if(m.total) {
        total = total + m.total
      }
    });
    setGrandTotal(total);
    saveMaterials(materials, total);
  }

  useEffect(() => {
    calculateGrandTotal();
  });

  return (
    <Card variant="outlined">
      <CardHeader subheader= "Materiales"/>
      <CardContent>        
        {materials.map((material, index) => (
          <Grid container spacing={2} alignItems="center" key={index}>
            <Grid item xs={2}>
              <Typography variant="body1">
              Ref. {material.reference}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
              {material.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField label="Precio" value={material.price} variant="outlined" size="small" disabled={true}
                InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}
              />  
            </Grid>
            <Grid item xs={1}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="mat-quantity">Cantidad</InputLabel>
              <OutlinedInput id="mat-quantity" value={material.quantity} type="number" labelWidth={60} 
                onChange={ ev => onUpdateQuantity(ev, index)}
              />
            </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField label="Total" value={material.total} variant="outlined" size="small" disabled={true}
                InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}
              />            
            </Grid>
            <Grid item >
              <Fab size="small" color="primary" aria-label="delete" onClick={() => onClearMaterial(index)}>
                <DeleteIcon />
              </Fab>
            </Grid>
          </Grid>
        ))}
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MaterialSearchSelect onMaterialSelected={onMaterialSelected} />
          </Grid>
          <Grid item>
            <TextField label="TOTAL" value={grandTotal} variant="outlined" disabled={true}
              InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

MaterialSelector.propTypes = {
  materialList: PropTypes.array.isRequired
};

export default MaterialSelector;