import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Button, Grid, Card, CardHeader, CardContent, CardActions } from "@material-ui/core";

const styles = ({
  mainCard: {    
    border: "none",  
    boxShadow: "none",
    padding: '10px'
  },
});

function AddItemCard(props) {
  const { classes, title, content, onOk, onCancel } = props;  

  return (
    <Card className={classes.mainCard}>
      <CardHeader title={title} titleTypographyProps={{variant:'h6'}} />
      <CardContent>
        {content}
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button onClick={onCancel} color="secondary">
              Cancelar
            </Button>             
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onOk} >
              Guardar
            </Button>            
          </Grid>          
        </Grid>
      </CardActions>
    </Card>    
  );
}

AddItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddItemCard);