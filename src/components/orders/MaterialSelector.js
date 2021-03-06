import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, TextField, IconButton } from "@material-ui/core";
import { Table, TableHead, TableRow, TableBody, TableCell, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialSearchSelect from '../shared/SearchSelectMaterial';

const headers = [
  {
    id:'ref',
    name:'Nombre',
  },
  {
    id:'name',
    name:'Referencia',
  },
  {
    id:'hours',
    name:'Precio',
  },
  {
    id:'hours',
    name:'Cantidad',
  },
  {
    id:'hours',
    name:'Total',
  },
  {
    id:'controls',
  },
]

function MaterialSelector(props) {
  const { materials, onUpdateMaterials } = props;

  const onInsert = useCallback((material) => {
    onUpdateMaterials([...materials, material]);    
  }, [materials, onUpdateMaterials]);

  const onRemove = useCallback((index) => {
    onUpdateMaterials(materials.filter((item, idx) => idx !== index))
  }, [materials, onUpdateMaterials]);

  const onUpdate = useCallback((index, quantity) => {    
    onUpdateMaterials(
      materials.map((item, idx) => 
        idx === index 
        ? {...item, quantity : quantity, total: item.price * quantity} 
        : item 
    ))
  }, [materials, onUpdateMaterials]);

  const tableContent = (  
    materials
      .map((mat, index) => (
      <TableRow hover key={index}>
        <TableCell component="th" scope="row">
          {mat.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {mat.reference}
        </TableCell>
        <TableCell component="th" scope="row">
          {mat.price} €
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField type="number" variant="standard" size="small" InputProps={{ inputProps: { min: 0 } }}
            value={mat.quantity} onChange={(event) => { onUpdate(index, event.target.value); }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {mat.total} €
        </TableCell>    
        <TableCell component="th" scope="row">
          <IconButton onClick={() => { onRemove(index); }}>
            <DeleteIcon color="secondary" fontSize="small" />
          </IconButton>         
        </TableCell>
      </TableRow>           
    ))
  );

  return (
    <Card variant="outlined">
      <CardHeader subheader= "Materiales"/>
      <CardContent>        
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers
                .map((head, index) => (
                <TableCell key={index}>
                  <Typography variant="subtitle2">
                    {head.name}
                  </Typography>
                </TableCell>            
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent}
            <TableRow key={materials.length + 1}>
              <TableCell>
                <MaterialSearchSelect onMaterialSelected={onInsert} />
              </TableCell>
            </TableRow>                 
          </TableBody>
        </Table>
      </CardContent>      
    </Card>
  );
}

MaterialSelector.propTypes = {
  materialList: PropTypes.array,
};

export default MaterialSelector;