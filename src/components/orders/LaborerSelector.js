import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, TextField, IconButton } from "@material-ui/core";
import { Table, TableHead, TableRow, TableBody, TableCell, Typography } from "@material-ui/core";
import SearchSelectLaborer from '../shared/SearchSelectLaborer';
import DeleteIcon from '@material-ui/icons/Delete';

const headers = [
  {
    id:'name',
    name:'Nombre',
  },
  {
    id:'hours',
    name:'Horas',
  },
  {
    id:'controls',
  },
]

function LaborerSelector(props) {
  const { laborers, onUpdateLaborers } = props;

  const onInsert = useCallback((selectedLaborer) => {
    onUpdateLaborers([...laborers, selectedLaborer]);    
  }, [laborers, onUpdateLaborers]);

  const onUpdate = useCallback((index, hours) => {    
    onUpdateLaborers(
      laborers.map((item, idx) => 
        idx === index 
        ? {...item, hours : hours, total: item.price * hours} 
        : item 
    ))
  }, [laborers, onUpdateLaborers]);

  const onRemove = useCallback((index) => {
    onUpdateLaborers(laborers.filter((item, idx) => idx !== index))
  }, [laborers, onUpdateLaborers]);

  const tableContent = (  
    laborers
      .map((laborer, index) => (
      <TableRow hover key={index}>
        <TableCell component="th" scope="row">
          {laborer.name}
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField type="number" variant="standard" size="small" InputProps={{ inputProps: { min: 0 } }}
            value={laborer.hours} onChange={(event) => { onUpdate(index, event.target.value); }}
          />
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
      <CardHeader subheader="Mano de obra" />
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
            <TableRow key={laborers.length + 1}>
              <TableCell>
                <SearchSelectLaborer onLaborerSelected={onInsert} />
              </TableCell>
            </TableRow>                 
          </TableBody>
        </Table>
      </CardContent>
    </Card>      
  );
}

LaborerSelector.propTypes = {
  laborers: PropTypes.array.isRequired,
  onUpdateLaborers: PropTypes.func.isRequired,
};

export default LaborerSelector;
