import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box, Grid, TextField, Fab, withStyles } from "@material-ui/core";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardActions, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DateTimePicker from "../shared/DateTimePicker"
import ButtonCircularProgress from "../shared/ButtonCircularProgress";

const styles = ({
  mainCard: {    
    border: "none",  
    boxShadow: "none",
    padding: '10px'
  },
});

function AddOrder(props) {
  const { classes, pushMessageToSnackbar, onClose } = props;  

  const clientInfo = (
    <Grid container spacing={2}>      
    </Grid>
  );

  const clientSelection = (                   
    <Grid container spacing={2}>      
    </Grid>
  );   

  return (
    <Card className={classes.mainCard}>
      <CardHeader title="Crear nuevo albaran" titleTypographyProps={{variant:'h6'}} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader subheader= "Cliente"/>
              <CardContent>                    
                <p>Pepe</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={6}/>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader subheader= "Fotos antes"/>
              <CardContent>                    
                <p>Pepe</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardHeader subheader= "Fotos despues"/>
              <CardContent>                    
                <p>Pepe</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader subheader= "Materiales"/>
              <CardContent>                    
                <p>Pepe</p>
              </CardContent>
            </Card>
          </Grid>          
        </Grid>          
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <Button onClick={onClose}>
              Cancelar
            </Button>             
          </Grid>
          <Grid item>
            <Button
              //onClick={ () => { PostNewMaterial(material, handlePost) } }
              variant="contained"
              color="secondary">
              Guardar {<ButtonCircularProgress />}
            </Button>            
          </Grid>          
        </Grid>
      </CardActions>
    </Card>
  );
}

AddOrder.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(AddOrder);